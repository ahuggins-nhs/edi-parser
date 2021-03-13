import { CharStreams, CommonTokenStream } from 'antlr4ts'
import type { EdiDomAbstractNode } from '../dom/EdiDomAbstractNode'
import { EdiDomComponent } from '../dom/EdiDomComponent'
import type { EdiDomElement } from '../dom/EdiDomElement'
import type { EdiDomSegment } from '../dom/EdiDomSegment'
import { EdiDomNode, EdiDomNodeAlias, EdiDomNodeType } from '../dom/EdiDomTypes'
import { EdiDomValue } from '../dom/EdiDomValue'
import { ElementSelectorLexer } from './ElementSelectorLexer'
import {
  ElementSelectorContext,
  ElementSelectorParser,
  ParentSegmentSelectorContext,
  SelectorContext
} from './ElementSelectorParser'
import { elementReference, elementValue, isNodeTag, isSegmentTag } from './helpers'
import { QueryDomWalker } from './QueryDomWalker'
import { QueryEngineList } from './QueryEngineList'
import type { ElementReference, QueryIterator } from './QueryEngineTypes'

export class QueryEngine {
  constructor (selector: string, node: EdiDomNode | EdiDomAbstractNode) {
    this.node = node
    this.selector = selector
    this.walker = new QueryDomWalker (this.node.walk())
  }

  private readonly node: EdiDomNode | EdiDomAbstractNode
  private readonly selector: string
  private parsed: SelectorContext
  private walker: QueryDomWalker

  list (): QueryEngineList<EdiDomNode> {
    return new QueryEngineList(this.evaluate())
  }

  /** Evaluate an element selector and return each element found. */
  *evaluate (): QueryIterator<EdiDomNode> {
    if (isNodeTag(this.selector)) {
      const nodeType = EdiDomNodeAlias[this.selector]

      if (nodeType === EdiDomNodeType.All) {
        for (const node of this.walker.descend()) yield node  
      } else {
        for (const node of this.walker.descend()) {
          if (node.nodeType === nodeType) yield node
        }
      }
    } else if (isSegmentTag(this.selector)) {
      for (const node of this.walker.descend()) {
        if ('tag' in node && node.tag === this.selector) {
          yield node
        }
      }
    } else {
      const charStream = CharStreams.fromString(this.selector, 'selector')
      const lexer = new ElementSelectorLexer(charStream)
      const tokens = new CommonTokenStream(lexer)
      const parser = new ElementSelectorParser(tokens)
      this.parsed = parser.selector()
  
      if (typeof this.parsed.elementSelector() === 'object') {
        for (const node of this.elementSelector()) {
          yield node
        }
      } else if (typeof this.parsed.parentSegmentSelector() === 'object') {
        for (const node of this.parentSegmentSelector()) {
          yield node
        }
      } else if (typeof this.parsed.hlPathSelector() === 'object') {
        for (const node of this.hlPathSelector()) {
          yield node
        }
      } else if (typeof this.parsed.loopPathSelector() === 'object') {
        for (const node of this.loopPathSelector()) {
          yield node
        }
      } else if (typeof this.parsed.elementValueSelector() === 'object') {
        for (const node of this.elementValueSelector()) {
          yield node
        }
      } else if (typeof this.parsed.elementNotValueSelector() === 'object') {
        for (const node of this.elementNotValueSelector()) {
          yield node
        }
      } else if (typeof this.parsed.elementContainsValueSelector() === 'object') {
        for (const node of this.elementContainsValueSelector()) {
          yield node
        }
      } else if (typeof this.parsed.elementAdjacentSelector() === 'object') {
        console.log('elementAdjacentSelector')
      } else if (typeof this.parsed.elementPrecedentSelector() === 'object') {
        console.log('elementAdjacentSelector')
      }
    }
  }

  /** Walk the node tree from the current position and select the elements matching the reference. */
  private *elementSelector (reference?: ElementReference): QueryIterator<EdiDomElement> {
    const selector = this.parsed.elementSelector()
    const ref = typeof reference === 'undefined'
      ? elementReference(selector.ElementReference())
      : reference
    const { segmentId, elementId } = ref

    for (const node of this.walker.descend()) {
      if (node.nodeType === EdiDomNodeType.Segment && node.tag === segmentId) {
        const element = node.getChildNode(elementId)

        if (typeof element === 'object') {
          yield element
        }
      }
    }
  }

  /** Follow a path of adjacent segments and select the first element at the end of the path. */
  private *parentSegmentSelector (ctx?: ParentSegmentSelectorContext): QueryIterator<EdiDomElement> {
    const selector = typeof ctx === 'undefined' ? this.parsed.parentSegmentSelector() : ctx
    const ref = elementReference(selector.ElementReference())
    const segmentIds = selector.SegmentID().map(segmentId => segmentId.text.toUpperCase())
    let counter = 0

    segmentIds.push(ref.segmentId)

    for (const node of this.walker.descend()) {
      if (node.nodeType === EdiDomNodeType.Segment) {
        if (node.tag === segmentIds[counter]) {
          if (node.tag === ref.segmentId) {
            const element = node.getChildNode(ref.elementId)
  
            if (typeof element === 'object') {
              yield element
            }
  
            counter = 0
          } else {
            counter += 1
          }
        } else {
          counter = 0
        }
      }
    }
  }

  /** Follow a path of hierarchical levels and select the first element at the end of the path. */
  private *hlPathSelector (): QueryIterator<EdiDomElement> {
    const selector = this.parsed.hlPathSelector()
    const hlCodes = selector.AnyCharacter().map(hlCode => hlCode.text)
    const ref = elementReference(selector.ElementReference())
    const parentSegmentPath = selector.parentSegmentSelector()
    let codeIndex = 0
    let lastHlParent = 0

    for (const node of this.walker.descend()) {
      if (node.nodeType === EdiDomNodeType.Segment && node.tag === 'HL') {
        const hlParentElement = node.getChildNode(2)
        const hlCodeElement = node.getChildNode(3)
        const hlParent = hlParentElement.value.text === '' ? 0 : parseFloat(hlParentElement.value.text)

        if (hlCodeElement.value.text === hlCodes[codeIndex]) {
          if (hlParent !== lastHlParent) lastHlParent = hlParent

          if (codeIndex === hlCodes.length) {
            codeIndex = 0
          } else {
            codeIndex += 1
          }
        }

        if (codeIndex === hlCodes.length && lastHlParent === hlParent) {
          if (typeof ref === 'object') {
            if (ref.segmentId === 'HL') {
              yield node.getChildNode(ref.elementId)
            } else {
              yield this.elementSelector(ref).next().value
            }
          } else {
            yield this.parentSegmentSelector(parentSegmentPath).next().value
          }
        }
      }
    }
  }

  /** Find a bounded or unbounded loop and return the first matching element in the loop. */
  private *loopPathSelector (): QueryIterator<EdiDomElement> {
    const selector = this.parsed.loopPathSelector()
    const ref = elementReference(selector.ElementReference())
    const parentSegmentPath = selector.parentSegmentSelector()
    const [startTag, endTag] = selector.SegmentID().map(segmentId => segmentId.text.toUpperCase())
    let loopNodes: EdiDomSegment[] = []
    let inLoop = false

    for (const node of this.walker.descend()) {
      if (node.nodeType === EdiDomNodeType.Segment) {
        if (node.tag === startTag) inLoop = true
        
        if (inLoop) {
          if (typeof ref === 'object') {
            loopNodes.push(node)
          } else {
            const element: EdiDomElement = this.parentSegmentSelector(parentSegmentPath).next().value

            if (typeof element === 'object') {
              if (element.parent.nodeType === EdiDomNodeType.Segment && element.parent.tag === endTag) {
                inLoop = false
              }

              yield element
            }
          }
        }

        if (node.tag === endTag) {
          inLoop = false

          for (const loopNode of loopNodes) {
            if (loopNode.tag === ref.segmentId) {
              yield loopNode.getChildNode(ref.elementId)
            }
          }

          loopNodes = []
        }
      }
    }
  }

  private *elementValueSelector (): QueryIterator<EdiDomElement> {
    const selector = this.parsed.elementValueSelector()
    const ref = elementReference(selector.ElementReference())
    const value = elementValue(selector.ElementValue())

    for (const node of this.elementSelector(ref)) {
      if (typeof node === 'object') {
        switch (node.type) {
          case 'component':
            if (node.value instanceof EdiDomComponent && node.value.text === value) {
              yield node
            }
            break
          case 'repeated':
            if (node.elements.map(el => el.value.text).includes(value)) {
              yield node
            }
            break
          case 'value':
            if (node.value instanceof EdiDomValue && node.value.text === value) {
              yield node
            }
            break
        }
      }
    }
  }

  private *elementNotValueSelector (): QueryIterator<EdiDomElement> {
    const selector = this.parsed.elementNotValueSelector()
    const ref = elementReference(selector.ElementReference())
    const value = elementValue(selector.ElementValue())

    for (const node of this.elementSelector(ref)) {
      if (typeof node === 'object') {
        switch (node.type) {
          case 'component':
            if (!(node.value instanceof EdiDomComponent && node.value.text === value)) {
              yield node
            }
            break
          case 'repeated':
            if (!node.elements.map(el => el.value.text).includes(value)) {
              yield node
            }
            break
          case 'value':
            if (!(node.value instanceof EdiDomValue && node.value.text === value)) {
              yield node
            }
            break
        }
      }
    }
  }

  private *elementContainsValueSelector (): QueryIterator<EdiDomElement> {
    const selector = this.parsed.elementContainsValueSelector()
    const ref = elementReference(selector.ElementReference())
    const value = elementValue(selector.ElementValue())

    for (const node of this.elementSelector(ref)) {
      if (typeof node === 'object' && typeof node.text === 'string' && node.text.includes(value)) {
        yield node
      }
    }
  }

  private *elementPrecedentSelector (selector: ElementSelectorContext): QueryIterator<EdiDomElement> {}

  private *elementAdjacentSelector (selector: ElementSelectorContext): QueryIterator<EdiDomElement> {}
}
