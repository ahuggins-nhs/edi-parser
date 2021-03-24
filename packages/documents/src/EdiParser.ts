import { CharStream, CharStreams, CommonTokenStream, RecognitionException, Recognizer } from 'antlr4ts'
import { EdiX12Lexer, EdiX12Parser } from '@js-edi/x12'
import { EdiFactLexer, EdiFactParser } from '@js-edi/fact'
import { EdiDomX12Listener } from './EdiDomX12Listener'
import type { Readable } from 'stream'
import type { DocumentContext as EdiFactDocumentContext } from '@js-edi/fact'
import type { DocumentContext as EdiX12DocumentContext } from '@js-edi/x12'
import type { EdiDomRoot } from '@js-edi/dom'

export type DocumentContext = EdiX12DocumentContext | EdiFactDocumentContext
export type EdiCustomLexer = EdiX12Lexer | EdiFactLexer
export type EdiCustomParser = EdiX12Parser | EdiFactParser

export type EdiDomListener = EdiDomX12Listener

export interface EdiParserOpts {
  encoding?: BufferEncoding
  fileName?: string
  ediType?: 'EDIX12' | 'EDIFACT'
  keepInitialListeners?: boolean
  throwOnError?: boolean
  contents: string | Buffer | Readable
}

export class EdiParser {
  constructor (opts: EdiParserOpts) {
    const keepInitialListeners = opts.keepInitialListeners ?? false
    const throwOnError = opts.throwOnError ?? false
    this.encoding = opts.encoding ?? 'utf8'
    this.fileName = opts.fileName ?? 'document.edi'
    this.parsed = false

    if (typeof opts.contents === 'string') {
      this.charStream = CharStreams.fromString(opts.contents, this.fileName)
    } else if (Buffer.isBuffer(opts.contents)) {
      this.charStream = CharStreams.fromString(opts.contents.toString(this.encoding), this.fileName)
    } else {
      // TODO: Write CharStreams implementation to handle a Node ReadableStream.
    }

    switch (opts.ediType) {
      case 'EDIFACT':
        this.lexer = new EdiFactLexer(this.charStream)
        this.tokens = new CommonTokenStream(this.lexer)
        this.parser = new EdiFactParser(this.tokens)
        break
      case 'EDIX12':
      default:
        this.listener = new EdiDomX12Listener()
        this.lexer = new EdiX12Lexer(this.charStream)
        this.tokens = new CommonTokenStream(this.lexer)
        this.parser = new EdiX12Parser(this.tokens)
        this.parser.addParseListener(this.listener)
        break
    }

    if (typeof this.parser === 'object') {
      if (!keepInitialListeners) {
        this.parser.removeErrorListeners()
      }

      if (throwOnError) {
        this.parser.addErrorListener({
          syntaxError<T = any>(
            recognizer: Recognizer<T, any>,
            offendingSymbol: T,
            line: number,
            charPositionInLine: number,
            msg: string,
            e?: RecognitionException
          ): void {
            throw new Error(`line ${line}:${charPositionInLine} ${msg}`)
          }
        })
      }
    }
  }

  fileName: string
  private readonly listener: EdiDomListener
  private readonly lexer: EdiCustomLexer
  private readonly tokens: CommonTokenStream
  private readonly parser: EdiCustomParser
  private readonly charStream: CharStream
  private readonly encoding: BufferEncoding
  private parsed: boolean

  /** Get the internal parser instance. */
  getParser (): EdiCustomParser {
    return this.parser
  }

  /** Synchronously parse to return an ANTLR4 ParseTree. */
  parse (): DocumentContext {
    const tree = this.parser.document()
    this.parsed = true

    return tree
  }

  /** Synchronously parse to return an EDI DOM root. */
  documentRoot (): EdiDomRoot {
    if (!this.parsed) this.parse()

    return this.listener.root
  }
}