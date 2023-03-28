import { toString } from 'mdast-util-to-string'
import { Node } from 'datocms-structured-text-utils/dist/types/types'
import Slugger from 'github-slugger'

export const slugs = new Slugger()

/**
 * 获取 Node 中的实际内容，转成 ID，用作 ID（GitHub 风格）
 * @param node
 * @param slug 是否获取 slug 格式，默认为 true
 */
export function getNodeValue(node?: Node | Node[], slug: boolean = true) {
  if (!node) {
    return ''
  }

  slugs.reset()
  const value = toString(node, { includeImageAlt: false })
  return slug ? slugs.slug(value) : value
}

/**
 * 获取 DOM 元素相对于页面顶部的高度
 * @param selector DOM 选择器
 */
export function getDOMOffset(selector: string) {
  // 根据 ID 获取对应的 DOM
  const dom = document.querySelector(selector)
  // 获取距离顶部的高度（参考 jQuery.fn.offset）
  const box = dom?.getBoundingClientRect() ?? { top: 0, left: 0 }
  const win = document.defaultView

  // console.log({ box: box.top, scroll: win?.scrollY, offset: win?.pageYOffset })
  return {
    top: box.top + (win?.scrollY || win?.pageYOffset || 0),
    left: box.left + (win?.scrollX || win?.pageXOffset || 0),
  }
}
