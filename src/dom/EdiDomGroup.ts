import { EdiDomMessage } from './EdiDomMessage'
import { EdiDomNode, EdiDomNodeType } from './EdiDomNode'
import { EdiDomSegment } from './EdiDomSegment'

/** An EDIFACT UNG message or an X12 ST transaction. */
export class EdiDomGroup extends EdiDomNode<EdiDomNodeType.Group> {
  constructor () {
    super()
    this.nodeType = EdiDomNodeType.Group
    this.header = new EdiDomSegment()
    this.messages = []
    this.trailer = new EdiDomSegment()
  }

  /** The header of this group. */
  header: EdiDomSegment<'UNG'|'GS'>
  /** The messages contained in this group. */
  messages: EdiDomMessage[]
  /** The trailer of this group. */
  trailer: EdiDomSegment<'UNE'|'GE'>

  /** Add a message to this group. */
  addChildNode (child: EdiDomMessage): void {
    if (child.nodeType === EdiDomNodeType.Message) {
      this.messages.push(child)
    }
  }
}