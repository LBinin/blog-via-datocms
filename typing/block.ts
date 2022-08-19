import { ColorInfo, PictureInfo } from '@/typing'
import { StructuredText } from 'datocms-structured-text-utils/dist/types/types'
import { MyBlock } from '@/const/block'

interface Record {
  __typename: MyBlock | string
  id: string
  [prop: string]: unknown
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
