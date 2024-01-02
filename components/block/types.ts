import { ColorInfo, PictureInfo } from '@/typing'
import {
  Record as StructuredTextGraphQlResponseRecord,
  StructuredText,
} from 'datocms-structured-text-utils/dist/types/types'

import { MyBlock } from '@/components/block/const'

interface Record extends StructuredTextGraphQlResponseRecord {
  __typename: MyBlock | string
}

// 图片块
export interface ImageBlockRecord extends Record {
  image?: PictureInfo
}

export interface TableDataSource {
  data: { [columnName: string]: string }[]
  columns: string[]
}

// 表格块
export interface TableBlockRecord extends Record {
  content?: TableDataSource
}

// 提示块
export interface CalloutBlockRecord extends Record {
  emojiIcon?: string
  title?: string
  content?: StructuredText
  color?: ColorInfo
}

export interface CodeBlockRecord extends Record {
  // 代码块
  multiTabCodeBlock?: StructuredText
  // 是否显示行号
  showLineNumber?: boolean
  // 是否自动换行
  wrapLongLines?: boolean
  // 默认激活 Tab
  defaultActiveTab?: number
  caption?: string
}

export interface CodeSandboxBlockRecord extends Record {
  url?: string
  height?: number
  title?: string
}

export interface MarkdownRecord extends Record {
  content?: string
}

export function isCodeBlock(record?: Record): record is CodeBlockRecord {
  return record?.__typename === MyBlock.Code
}

export function isCalloutBlock(record?: Record): record is CalloutBlockRecord {
  return record?.__typename === MyBlock.Callout
}

export function isImageBlock(record?: Record): record is ImageBlockRecord {
  return record?.__typename === MyBlock.Image
}

export function isTableBlock(record?: Record): record is TableBlockRecord {
  return record?.__typename === MyBlock.Table
}

export function isCodeSandboxBlock(record?: Record): record is CodeSandboxBlockRecord {
  return record?.__typename === MyBlock.CodeSandboxBlock
}

export function isMarkdownBlock(record?: Record): record is MarkdownRecord {
  return record?.__typename === MyBlock.MarkdownBlock
}
