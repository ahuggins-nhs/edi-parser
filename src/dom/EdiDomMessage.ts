import { EdiDomSegment } from './EdiDomSegment'

/** An EDIFACT UNH message or an X12 ST transaction. */
export class EdiDomMessage {
  /** The header of this message. */
  header: EdiDomSegment<'UNH'|'ST'>
  /** The segments contained in this message. */
  segments: EdiDomSegment[]
  /** The trailer of this message. */
  trailer: EdiDomSegment<'UNT'|'SE'>
}
