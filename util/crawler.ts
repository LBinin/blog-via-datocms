import { AlgoliaIndexRecord } from '@/typing'
import { PostInfo, StructuredTextContent } from '@/typing/post'
import { StructuredText as StructuredTextGraphQlResponse } from 'datocms-structured-text-utils/dist/types/types'
import { isBlock, isHeading, isParagraph } from 'datocms-structured-text-utils'
import { getNodeValue, slugs } from '@/util/index'
import { clone } from 'lodash'
// import { render as structuredTextToPlainText } from 'datocms-structured-text-to-plain-text'
import { convertBlockRecordToPlainText, convertStructuredTextToPlainText } from '@/util/convert'

/**
 * 为每篇文章生成一段可检索的内容结构
 * @param postInfo 文章信息
 */
export function extractContentFromStructuredText(postInfo: PostInfo): AlgoliaIndexRecord[] {
  // - lvl0 均为文章标题
  // - 每个一级标题（type: lvl1），需要

  const log = (...args: any[]) => console.log('[Extract]', ...args)
  const dast = postInfo.content // DatoCMS Abstract Syntax Tree
  const LVL_LENGTH = 6

  log('========= start =========')
  log(dast)
  log(postInfo)

  // 文章层级结构（会在遍历文章内容过程中发生改变）
  // lvl1 设置为 title 是为了防止文章开头的文字没有一级标题
  let currentHierarchy: AlgoliaIndexRecord['hierarchy'] = { lvl0: postInfo.title }

  const changeLvlTitle = (lvl: number, str: string) => {
    const indexArr = new Array(LVL_LENGTH).fill(1).map((v, i) => v + i)
    // log({ lvl, str })
    indexArr.forEach((i: number) => {
      if (i < lvl) return
      // @ts-ignore
      currentHierarchy[`lvl` + i] = i === lvl ? str : undefined
    })

    return clone(currentHierarchy)
  }

  const getCurrentHierarchy = () => {
    if (!currentHierarchy.lvl1) {
      return clone({ ...currentHierarchy, lvl1: currentHierarchy.lvl0 })
    }
    return clone(currentHierarchy)
  }

  const getCurrentHeadingTitle = () => {
    for (let lvl = LVL_LENGTH; lvl > 0; lvl--) {
      // @ts-ignore
      const targetHeadingTitle = currentHierarchy[`lvl` + lvl]
      if (targetHeadingTitle !== undefined) {
        return targetHeadingTitle
      }
    }
    return undefined
  }

  let contentText = ''
  let currentHeadingDeep = 0 // 用于计算当前标题深度，也就是 lvl 后面跟的数
  let currentHeadingLevel = 0

  const result: AlgoliaIndexRecord[] = []

  // content
  const blocks = dast?.blocks;

  dast?.value.document.children.forEach((node, nodeIndex) => {
    const postTitle = postInfo.title ?? ''
    const postUrl = `https://bigno.me/posts/${postInfo.slug}`
    const objectID = [nodeIndex, postUrl].join('-')
    const postSlug = postInfo.slug
    const nodeContent = convertStructuredTextToPlainText(node) ?? '' // 这里转为文本已经用到了其中的 customNodeRules，会对 list、link 等进行可视化文本的转义

    slugs.reset()
    const currentHeadingTitle = getCurrentHeadingTitle()
    const headingSlugs = currentHeadingTitle ? slugs.slug(currentHeadingTitle) : undefined
    const urlWithHashTag = [postUrl, headingSlugs].filter(Boolean).join('#')

    log(node)
    // 通用数据
    const commonInfo: AlgoliaIndexRecord = {
      objectID,
      slug: postSlug,
      title: postTitle,
      content: nodeContent,
      url: urlWithHashTag,
      hierarchy: getCurrentHierarchy(),
      type: 'content',
      priority: LVL_LENGTH + 1,
    }

    // 处理 Block
    if (isBlock(node)) {
      log('=============== NODE ===============')
      const foundRecord = blocks?.find(block => block.id === node.item)
      if (!foundRecord) return
      const blockContent = convertBlockRecordToPlainText(foundRecord)
      if (!blockContent) return

      result.push({
        ...commonInfo,
        content: blockContent,
      })

      log(result[result.length - 1])
      return
    }

    // 不处理空内容
    if (!nodeContent) {
      log('=========== No Content =========')
      return
    }

    // 添加标题内容
    if (isHeading(node)) {
      if (node.level > currentHeadingLevel) currentHeadingDeep++
      if (node.level < currentHeadingLevel) currentHeadingDeep--

      currentHeadingLevel = node.level

      result.push({
        ...commonInfo,
        // content,
        hierarchy: changeLvlTitle(currentHeadingDeep, nodeContent),
        url: [postUrl, getCurrentHeadingTitle()].filter(Boolean).join('#'),
        type: `lvl${currentHeadingDeep}` as any,
        priority: currentHeadingDeep
      })

      log(result[result.length - 1])
      return
    }

    result.push(commonInfo)
    log(result[result.length - 1])
  })

  // log(currentHierarchy)
  log({ result })

  return result
}

