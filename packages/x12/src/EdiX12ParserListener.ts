// Generated from grammars/x12/EdiX12Parser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { DocumentContext } from "./EdiX12Parser";
import { InterchangeContext } from "./EdiX12Parser";
import { GroupContext } from "./EdiX12Parser";
import { TransactionContext } from "./EdiX12Parser";
import { SegmentContext } from "./EdiX12Parser";
import { InterchangeHeaderContext } from "./EdiX12Parser";
import { InterchangeTrailerContext } from "./EdiX12Parser";
import { GroupHeaderContext } from "./EdiX12Parser";
import { GroupTrailerContext } from "./EdiX12Parser";
import { TransactionHeaderContext } from "./EdiX12Parser";
import { TransactionTrailerContext } from "./EdiX12Parser";
import { SegmentEndContext } from "./EdiX12Parser";
import { RepititionContext } from "./EdiX12Parser";
import { ElementContext } from "./EdiX12Parser";
import { InterchangeElementContext } from "./EdiX12Parser";
import { StrictElementContext } from "./EdiX12Parser";
import { DataCharElementContext } from "./EdiX12Parser";
import { RepititionCharElementContext } from "./EdiX12Parser";
import { ComponentCharElementContext } from "./EdiX12Parser";
import { RepeatedElementContext } from "./EdiX12Parser";
import { ComponentContext } from "./EdiX12Parser";
import { ValueContext } from "./EdiX12Parser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `EdiX12Parser`.
 */
export interface EdiX12ParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `EdiX12Parser.document`.
	 * @param ctx the parse tree
	 */
	enterDocument?: (ctx: DocumentContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.document`.
	 * @param ctx the parse tree
	 */
	exitDocument?: (ctx: DocumentContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.interchange`.
	 * @param ctx the parse tree
	 */
	enterInterchange?: (ctx: InterchangeContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.interchange`.
	 * @param ctx the parse tree
	 */
	exitInterchange?: (ctx: InterchangeContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.group`.
	 * @param ctx the parse tree
	 */
	enterGroup?: (ctx: GroupContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.group`.
	 * @param ctx the parse tree
	 */
	exitGroup?: (ctx: GroupContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.transaction`.
	 * @param ctx the parse tree
	 */
	enterTransaction?: (ctx: TransactionContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.transaction`.
	 * @param ctx the parse tree
	 */
	exitTransaction?: (ctx: TransactionContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.segment`.
	 * @param ctx the parse tree
	 */
	enterSegment?: (ctx: SegmentContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.segment`.
	 * @param ctx the parse tree
	 */
	exitSegment?: (ctx: SegmentContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.interchangeHeader`.
	 * @param ctx the parse tree
	 */
	enterInterchangeHeader?: (ctx: InterchangeHeaderContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.interchangeHeader`.
	 * @param ctx the parse tree
	 */
	exitInterchangeHeader?: (ctx: InterchangeHeaderContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.interchangeTrailer`.
	 * @param ctx the parse tree
	 */
	enterInterchangeTrailer?: (ctx: InterchangeTrailerContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.interchangeTrailer`.
	 * @param ctx the parse tree
	 */
	exitInterchangeTrailer?: (ctx: InterchangeTrailerContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.groupHeader`.
	 * @param ctx the parse tree
	 */
	enterGroupHeader?: (ctx: GroupHeaderContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.groupHeader`.
	 * @param ctx the parse tree
	 */
	exitGroupHeader?: (ctx: GroupHeaderContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.groupTrailer`.
	 * @param ctx the parse tree
	 */
	enterGroupTrailer?: (ctx: GroupTrailerContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.groupTrailer`.
	 * @param ctx the parse tree
	 */
	exitGroupTrailer?: (ctx: GroupTrailerContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.transactionHeader`.
	 * @param ctx the parse tree
	 */
	enterTransactionHeader?: (ctx: TransactionHeaderContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.transactionHeader`.
	 * @param ctx the parse tree
	 */
	exitTransactionHeader?: (ctx: TransactionHeaderContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.transactionTrailer`.
	 * @param ctx the parse tree
	 */
	enterTransactionTrailer?: (ctx: TransactionTrailerContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.transactionTrailer`.
	 * @param ctx the parse tree
	 */
	exitTransactionTrailer?: (ctx: TransactionTrailerContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.segmentEnd`.
	 * @param ctx the parse tree
	 */
	enterSegmentEnd?: (ctx: SegmentEndContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.segmentEnd`.
	 * @param ctx the parse tree
	 */
	exitSegmentEnd?: (ctx: SegmentEndContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.repitition`.
	 * @param ctx the parse tree
	 */
	enterRepitition?: (ctx: RepititionContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.repitition`.
	 * @param ctx the parse tree
	 */
	exitRepitition?: (ctx: RepititionContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.element`.
	 * @param ctx the parse tree
	 */
	enterElement?: (ctx: ElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.element`.
	 * @param ctx the parse tree
	 */
	exitElement?: (ctx: ElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.interchangeElement`.
	 * @param ctx the parse tree
	 */
	enterInterchangeElement?: (ctx: InterchangeElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.interchangeElement`.
	 * @param ctx the parse tree
	 */
	exitInterchangeElement?: (ctx: InterchangeElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.strictElement`.
	 * @param ctx the parse tree
	 */
	enterStrictElement?: (ctx: StrictElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.strictElement`.
	 * @param ctx the parse tree
	 */
	exitStrictElement?: (ctx: StrictElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.dataCharElement`.
	 * @param ctx the parse tree
	 */
	enterDataCharElement?: (ctx: DataCharElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.dataCharElement`.
	 * @param ctx the parse tree
	 */
	exitDataCharElement?: (ctx: DataCharElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.repititionCharElement`.
	 * @param ctx the parse tree
	 */
	enterRepititionCharElement?: (ctx: RepititionCharElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.repititionCharElement`.
	 * @param ctx the parse tree
	 */
	exitRepititionCharElement?: (ctx: RepititionCharElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.componentCharElement`.
	 * @param ctx the parse tree
	 */
	enterComponentCharElement?: (ctx: ComponentCharElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.componentCharElement`.
	 * @param ctx the parse tree
	 */
	exitComponentCharElement?: (ctx: ComponentCharElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.repeatedElement`.
	 * @param ctx the parse tree
	 */
	enterRepeatedElement?: (ctx: RepeatedElementContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.repeatedElement`.
	 * @param ctx the parse tree
	 */
	exitRepeatedElement?: (ctx: RepeatedElementContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.component`.
	 * @param ctx the parse tree
	 */
	enterComponent?: (ctx: ComponentContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.component`.
	 * @param ctx the parse tree
	 */
	exitComponent?: (ctx: ComponentContext) => void;

	/**
	 * Enter a parse tree produced by `EdiX12Parser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `EdiX12Parser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
}

