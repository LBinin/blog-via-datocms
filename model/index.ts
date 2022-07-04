// 文章作者信息
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'
import { RenderContext, TrasformFn } from 'datocms-structured-text-utils/dist/types/render'
import { Node } from 'datocms-structured-text-utils/dist/types/types'

export interface PostAuthorInfo {
  name: string;
  picture: {
    responsiveImage: ResponsiveImageType
  };
}

export type StructuredTextRenderContext<N extends Node> = RenderContext<TrasformFn, TrasformFn, TrasformFn, N>
