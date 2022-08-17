import {
  Node,
  StructuredText as StructuredTextGraphQlResponse,
} from 'datocms-structured-text-utils/dist/types/types'
import {
  RenderContext,
  TrasformFn,
} from 'datocms-structured-text-utils/dist/types/render'
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'

export type PostInfo = {
  // 文章标题
  title?: string
  // 作者信息
  author?: PostAuthorInfo
  // 日期
  date?: string
  // 封面图片
  coverImage?: PictureInfo
  slug?: string
  // 是否 WIP
  wip?: boolean
  // 文章内容
  content?: StructuredTextGraphQlResponse
  // SEO
  seo?: any[]
  theme?: {
    hex: string
  }
} & {
  [prop: string]: unknown
}

export type PictureInfo = {
  responsiveImage: ResponsiveImageType
}

// 文章作者信息
export interface PostAuthorInfo {
  name: string
  picture: PictureInfo
}

export type StructuredTextRenderContext<N extends Node> = RenderContext<
  TrasformFn,
  TrasformFn,
  TrasformFn,
  N
>
