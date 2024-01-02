import {
  Document as StructuredTextDocument,
  Node, Record as StructuredTextGraphQlResponseRecord, StructuredText as StructuredTextGraphQlResponse,
  StructuredText,
} from 'datocms-structured-text-utils/dist/types/types'
import { AuthorInfo, PictureInfo, TopicInfo } from '@/typing/index'
import {
  RenderContext,
  TrasformFn,
} from 'datocms-structured-text-utils/dist/types/render'

export type PostInfo = {
  // 文章标题
  title?: string
  // 摘要
  excerpt?: string
  // 作者信息
  author?: AuthorInfo
  // 日期（格式：2022-01-01）
  date?: string
  // 封面图片
  coverImage?: PictureInfo
  // 固定链接标题
  slug?: string
  // 是否 WIP
  wip?: boolean
  // 是否转载
  isReprint?: boolean
  // 参考链接
  referenceLink?: string
  // 文章内容
  content?: StructuredText
  // 文章对应话题
  category?: TopicInfo[]
  // SEO
  seo?: any[]
  theme?: {
    hex: string
  }
} & {
  [prop: string]: unknown
}

// Node 渲染上下文
export type StructuredTextRenderContext<N extends Node> = RenderContext<
  TrasformFn,
  TrasformFn,
  TrasformFn,
  N
>

// DatoCMS 内容结构体
export type StructuredTextContent<R extends StructuredTextGraphQlResponseRecord = StructuredTextGraphQlResponseRecord> =
  | StructuredTextGraphQlResponse<StructuredTextGraphQlResponseRecord>
  | StructuredTextDocument
  | Node
  | null
  | undefined
