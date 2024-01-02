import { StructuredText as StructuredTextGraphQlResponse } from 'datocms-structured-text-utils/dist/types/types'
import { getNodeValue } from '@/util/index'
import { isCode } from 'datocms-structured-text-utils'
import { isCalloutBlock, isCodeBlock, isImageBlock, isMarkdownBlock, isTableBlock } from '@/components/block/types'

/**
 * 图片的读取时间第一张 12 秒，第二张 11 秒，依次减少 1 秒，第十章后每张最少 3 秒。
 * 部分代码 stolen from https://github.com/voorhoede/datocms-plugin-word-counter
 */

const WORDS_PER_MINUTE = 225 // WPM: 每分钟阅读文字数量

// function hasNoSpace(word: string): boolean {
//   return word !== ' ' && word !== ''
// }

function wordCounter(value: string) {
  // const wordRegex = /[ \n]/
  // const words = value.split(wordRegex).filter(hasNoSpace)
  const spaceAndNewline = /[\r\n\s]/g
  const words = value.replace(spaceAndNewline, '')

  return words.length
}

/**
 * 文字时间计算（单位：s）
 * @param string
 */
function readingTextTime(string: string) {
  const numberOfWords = wordCounter(string)
  return (numberOfWords / WORDS_PER_MINUTE) * 60
}

/**
 * 图片阅读时间计算（单位：s）
 * @param count 图片数量
 */
function readingImageTime(count: number) {
  if (count === 0) return 0

  // 12 + 11 + 10 + ...
  if (count < 10) return (12 - count) * count + ((1 + count) * count) / 2

  // 最小 3 s
  return 75 + (count - 10) * 3
}

/**
 * 计算阅读文章所需时间（单位：s）
 * @param string 文章所有文字
 * @param imageCount 图片数量
 */
export function readingTimeCounter(
  string: string = '',
  imageCount: number = 0
) {
  const textTime = readingTextTime(string)
  const imageTime = readingImageTime(imageCount)

  return textTime + imageTime // 单位：s
}

/**
 * 根据阅读时间转换对应文案
 * @param seconds 文章阅读时间（单位：s）
 */
export function readingTimeString(seconds: number) {
  const minutes = seconds / 60

  if (minutes === 0) {
    return '一秒读完'
  }

  if (minutes < 0.95) {
    const readingTimePerSecond = (minutes * 60) % 60

    if (readingTimePerSecond >= 1 && readingTimePerSecond < 2) {
      return '大约 1 秒'
    } else if (readingTimePerSecond >= 2) {
      return `大约 ${Math.floor(readingTimePerSecond)} 秒`
    }

    return '小于 1 秒'
  } else if (minutes >= 0.95 && minutes <= 1.5) {
    return '大约一分钟'
  }

  return `大约 ${Math.ceil(minutes)} 分钟`
}

/**
 * 计算通过 GraphQL 拿到的文章内容中的文字和图片数量
 * @param content 文章原始内容
 */
export function countPostContent(content?: StructuredTextGraphQlResponse) {
  const result = { imageCount: 0, text: '' }

  if (!content) return result

  const imageCount = content.blocks?.filter(isImageBlock).length

  // 文章内的 plain text
  const originTextCount = getNodeValue(content.value.document, false)

  // 自定义 Block 的文字内容
  const blockTextCount = content.blocks?.map(block => {
    if (isCodeBlock(block)) {
      return getNodeValue(block.multiTabCodeBlock?.value.document, false)
    }
    if (isCalloutBlock(block)) {
      return [
        getNodeValue(block.content?.value.document, false),
        block.title,
      ].join('')
    }
    if (isTableBlock(block)) {
      return [
        block.content?.columns.join(''),
        block.content?.data && Object.values(block.content?.data).join(''),
      ]
    }
    if (isMarkdownBlock(block) && block.content) {
      // TODO: 完善 MD 的阅读时间（图片、链接）
      return block.content
    }

    return ''
  })

  // 不被 getNodeValue 计算在内的 Node 文字计算
  const specialTypeNodeText = content.value.document.children.map(node => {
    if (isCode(node)) {
      return node.code
    }

    return ''
  })

  result.text =
    originTextCount + blockTextCount?.join('') + specialTypeNodeText.join('')
  result.imageCount = imageCount ?? 0

  return result
}
