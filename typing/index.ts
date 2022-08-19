import { ResponsiveImageType } from 'react-datocms/dist/types/Image'
import { Node } from 'datocms-structured-text-utils/dist/types/types'
import {
  RenderContext,
  TrasformFn,
} from 'datocms-structured-text-utils/dist/types/render'

// 响应式图片
export interface PictureInfo {
  responsiveImage: ResponsiveImageType
}

// 文章作者信息
export interface AuthorInfo {
  name: string
  picture: PictureInfo
}

// 颜色信息
export interface ColorInfo {
  alpha: number
  blue: number
  green: number
  hex: string
  red: number
}

// Node 渲染上下文
export type StructuredTextRenderContext<N extends Node> = RenderContext<
  TrasformFn,
  TrasformFn,
  TrasformFn,
  N
>
