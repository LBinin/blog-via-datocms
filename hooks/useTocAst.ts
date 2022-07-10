import { u } from 'unist-builder'
import { toc } from 'mdast-util-toc'
import { useMemo } from 'react'
import { isHeading } from 'datocms-structured-text-utils'
import { Heading, Node } from 'datocms-structured-text-utils/dist/types/types'

/**
 * 解析 TOC，返回对应的 MDAST
 */
const useTocAst = (dataSource?: Node[]) => {
  const headingNodes = useMemo(() => dataSource?.filter(node => isHeading(node)) as Heading[], [dataSource])

  const tree = u('root', headingNodes.map(node => u('heading', { depth: node.level }, node.children)))
  const table = toc(tree as any, { ordered: false })

  return table.map
}

export default useTocAst
