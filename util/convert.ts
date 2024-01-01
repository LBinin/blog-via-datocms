import { render as structuredTextToPlainText } from 'datocms-structured-text-to-plain-text'
import { isBlockquote, isLink, isList } from 'datocms-structured-text-utils'
import { isCalloutBlock, isCodeBlock, isImageBlock, isTableBlock } from '@/components/block/utils'
import { renderNodeRule } from 'react-datocms'
import { getNodeValue } from '@/util/index'
import { StructuredTextContent } from '@/typing/post'
import { Record as StructuredTextGraphQlResponseRecord } from 'datocms-structured-text-utils/dist/types/types'
import { Node } from 'datocms-structured-text-utils/src/types'

/**
 * Covert Structured text (DatoCMS content structure object) to plain text (for algolia temporarily)
 * @param content
 */
export function convertStructuredTextToPlainText(
  content: StructuredTextContent
) {
  return structuredTextToPlainText(content, {
    // 常见 Node 文字可视化
    customNodeRules: [
      renderNodeRule(isList, ctx => {
        return ctx.children?.map((item, index) => `${ctx.node.style === 'bulleted' ? '-' : index + 1} ${item}`).join(' ')
      }),
      renderNodeRule(isLink, ctx => {
        return `[${getNodeValue(ctx.node.children)}](${ctx.node.url})`
      }),
      renderNodeRule(isBlockquote, ctx => {
        const content: string = ctx.node.children?.map(convertStructuredTextToPlainText).join(' ')
        return [content, ctx.node.attribution].join(' —— ')
      })
    ],
    renderBlock: context => convertBlockRecordToPlainText(context.record),
  })
}

export function convertBlockRecordToPlainText(record: StructuredTextGraphQlResponseRecord) {
  if (isImageBlock(record)) {
    const title = record.image?.responsiveImage.title
    return title ? `[图片 - ${title}]` : ''
  }

  if (isCodeBlock(record)) {
    return structuredTextToPlainText(record.multiTabCodeBlock)
  }

  if (isCalloutBlock(record)) {
    return [
      record.emojiIcon,
      record.title,
      structuredTextToPlainText(record.content),
    ]
      .filter(Boolean)
      .join(' ') // `${} ${record.title} ${record.content}`
  }

  if (isTableBlock(record)) {
    const order = record.content?.columns
    return record.content?.data
      ?.map(row =>
        order?.map(column => `${column}: ${row[column]}`).join(' ')
      )
      .join(' ')
  }

  return ''
}
