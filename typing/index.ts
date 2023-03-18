import { ResponsiveImageType } from 'react-datocms/dist/types/Image'

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

// 话题信息
export interface TopicInfo {
  name: string
  slug: string
}
