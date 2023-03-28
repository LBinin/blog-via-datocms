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

// Algolia
export interface AlgoliaIndexRecord {
  objectID: string;
  title: string;
  content: string; // 目标检索对象
  hierarchy: { // 目录层级
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
    lvl4?: string;
    lvl5?: string;
    lvl6?: string;
  }
  type: 'content' | 'lvl1' | 'lvl2', // 决定搜索结果的结构展示和 prefix icon
  url: string;
  priority: number; // 搜索优先级，越小越重要
  excerpt?: string;
  slug?: string;
  date?: string; // 2022-01-01
}
