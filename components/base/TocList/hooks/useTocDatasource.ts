import { useMemo } from 'react'
import { isMarkdownBlock } from '@/components/block/types'
import MarkdownIt from 'markdown-it'
import { PostInfo } from '@/typing/post'
import { Heading } from 'datocms-structured-text-utils/src/types'

/**
 * 兼容 Markdown 的标题内容
 * @param post
 */
export default function useTocDatasource(post?: PostInfo) {
  return useMemo(() => {
    return post?.content?.value?.document?.children
      .map(item => {
        const markdownBlocks = post?.content?.blocks?.filter(isMarkdownBlock)

        // 判断是否是 Markdown
        const markdownBlock =
          item.type === 'block'
            ? markdownBlocks?.find(i => i.id === item.item)
            : undefined

        if (markdownBlock?.content) {
          const md = new MarkdownIt()
          const tokens = md.parse(markdownBlock.content, {})

          // 提取标题节点信息
          const headings: Heading[] = []
          tokens.forEach((token, index) => {
            if (token.type === 'heading_open') {
              const level = token.tag.slice(1) // 获取标题级别
              const titleToken = tokens[index + 1] // 下一个 token 是标题内容
              const title = titleToken.content // 获取标题内容
              headings.push({
                level: +level as any,
                type: 'heading',
                children: [{ type: 'span', value: title }],
              }) // 存储标题信息
            }
          })

          return headings
        }

        return item
      })
      .flat()
  }, [post?.content?.value?.document?.children])
}
