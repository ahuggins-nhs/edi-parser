import type { EdiDomComponent } from './EdiDomComponent'
import type { EdiDomElement } from './EdiDomElement'
import type { EdiDomGroup } from './EdiDomGroup'
import type { EdiDomHierarchical } from './EdiDomHierarchical'
import type { EdiDomInterchange } from './EdiDomInterchange'
import type { EdiDomMessage } from './EdiDomMessage'
import type { EdiDomNodeType } from './EdiDomNodeType'
import type { EdiDomRoot } from './EdiDomRoot'
import type { EdiDomSegment } from './EdiDomSegment'
import type { EdiDomValue } from './EdiDomValue'

/**
 * Options for parsing/reconstructing an EDI document.
 * In the case of EDIFACT, this represents the UNA segment.
 * In the case of EDIX12, this represents control characters in the ISA segment.
 */
 export interface EdiDomOptions {
  /** The component separator for EDI documents. */
  componentSeparator: string
  /** The data separator for EDI documents. */
  dataSeparator: string
  /** The decimal mark for EDIFACT documents only. */
  decimalMark?: ',' | '.'
  /** The release indicator for EDIFACT documents only. */
  releaseIndicator?: string
  /** The repitition separator for EDI documents. */
  repititionSeparator?: string
  /** The segment terminator for EDI documents. */
  segmentTerminator: string
  /** The formatting mark for prettified EDI documents. */
  endOfLine?: string
}

export type EdiDomNode = 
  | EdiDomRoot
  | EdiDomInterchange
  | EdiDomGroup
  | EdiDomMessage
  | EdiDomHierarchical
  | EdiDomSegment
  | EdiDomElement
  | EdiDomComponent
  | EdiDomValue

export type EdiDomDocumentType = 'EDIFACT' | 'EDIX12'

export interface EdiDomNodeTagMap extends Record<EdiDomNodeType, EdiDomNode> {
  '*': EdiDomNode
  All: EdiDomNode
  Root: EdiDomRoot
  Interchange: EdiDomInterchange
  Group: EdiDomGroup
  Message: EdiDomMessage
  Transaction: EdiDomMessage
  Hierarchical: EdiDomHierarchical
  Segment: EdiDomSegment
  Element: EdiDomElement
  Component: EdiDomComponent
  Value: EdiDomValue
  ISA: EdiDomInterchange
  GS: EdiDomGroup
  ST: EdiDomMessage
  UNB: EdiDomInterchange
  UNE: EdiDomGroup
  UNH: EdiDomMessage
}
