import * as shell from 'gulp-shell'
import * as del from 'del'
import { series } from 'gulp'

export async function antlr4ts (): Promise<void> {
  await shell.task([
    'antlr4ts -visitor grammar/EdiFactLexer.g4 grammar/EdiFactParser.g4 -o packages/fact/src',
    'antlr4ts -visitor grammar/EdiX12Lexer.g4 grammar/EdiX12Parser.g4 -o packages/x12/src',
    'antlr4ts -visitor grammar/ElementSelector.g4 -o packages/query/src'
  ])()
}

export async function cleanup (): Promise<void> {
  await del([
    '**/*.d.ts',
    '**/*.js',
    '**/*.js.map'
  ], {
    ignore: ['**/node_modules/**']
  })
}

export async function mocha (): Promise<void> {
  await shell.task('mocha')()
}

export async function nyc (): Promise<void> {
  await shell.task('nyc mocha')()
}

export const test = series(cleanup, antlr4ts, mocha)
export const coverage = series(cleanup, antlr4ts, nyc)

export async function lint (): Promise<void> {
  await shell.task('ts-standard --report codeframe')()
}

export async function fix (): Promise<void> {
  await shell.task('ts-standard --fix --report codeframe')()
}
