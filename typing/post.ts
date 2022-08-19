import { StructuredText } from 'datocms-structured-text-utils/dist/types/types'
import { AuthorInfo, PictureInfo } from '@/typing/index'

export type PostInfo = {
  // 文章标题
  title?: string
  // 作者信息
  author?: AuthorInfo
  // 日期
  date?: string
  // 封面图片
  coverImage?: PictureInfo
  slug?: string
  // 是否 WIP
  wip?: boolean
  // 文章内容
  content?: StructuredText
  // SEO
  seo?: any[]
  theme?: {
    hex: string
  }
} & {
  [prop: string]: unknown
}
