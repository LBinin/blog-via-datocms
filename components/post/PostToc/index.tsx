import { u } from 'unist-builder'
import { useScroll } from 'ahooks'
import classnames from 'classnames'
import { toc } from 'mdast-util-toc'
import styles from './index.module.scss'
import { List, ListContent } from 'mdast'
import { StructuredText } from 'react-datocms'
import { getDOMOffset, getNodeValue } from '@/util'
import { isHeading } from 'datocms-structured-text-utils'
import React, { useEffect, useMemo, useState } from 'react'
import { Heading, Node } from 'datocms-structured-text-utils/dist/types/types'

const getListItemValue = (listItem: ListContent) => {
  const itemNode = listItem.children.filter(child => child.type !== 'list')
  return getNodeValue(itemNode as any)
}

interface TOCLevelItem {
  node: Heading;
  level: number;
  parent: TOCLevelItem | null;
  children: TOCLevelItem[];
}

const PostToc: React.FC<{
  dataSource?: Node[]
}> = props => {
  const { dataSource } = props

  const [scrollTarget, setScrollTarget] = useState<any>()
  const scroll = useScroll(scrollTarget)

  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  useEffect(() => {
    // 绕过 next 静态生成
    setScrollTarget(document)
  }, [])

  // 获取所有标题节点
  const headingNodes = useMemo(() => dataSource?.filter(node => isHeading(node)) as Heading[], [dataSource])

  // 页面滚动监听当前所在标题节点
  useEffect(() => {
    const firstNodeOffsetTop = getDOMOffset(
      `#${getNodeValue(headingNodes[0])}`,
    ).top

    if (
      scroll?.top === undefined ||
      scroll.top < firstNodeOffsetTop
    ) {
      setActiveHeading(null)
      return
    }

    // 获取所有节点高度
    const headingOffsetList = headingNodes.map(node => {
      const slug = getNodeValue(node)
      return {
        slug,
        ...getDOMOffset(`#${slug}`),
      }
    })

    const index = headingOffsetList.reverse().findIndex(({ top }) =>
      (scroll?.top ?? Infinity) > top - 1, // 减去 1px 防止小数点没对齐
    )

    // console.log({ scroll: scroll?.top, headingOffsetList, index })
    // 变更当前 Heading
    setActiveHeading(headingOffsetList[index].slug)
  }, [scroll?.top])

  // 动态修改 Hash
  // https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-active-header-links/clientRootMixin.js
  useEffect(() => {
    const { href } = window.location
    // 修改 Hash
    const url = new URL(href)
    url.hash = activeHeading ? activeHeading : ''
    const newUrl = url.href

    window.history.replaceState({
      ...window.history.state,
      as: newUrl,
      url: newUrl,
    }, '', newUrl)
  }, [activeHeading])

  // 解析 TOC
  const tree = u('root', headingNodes.map(node => u('heading', { depth: node.level }, node.children)))
  const table = toc(tree as any, { ordered: false })

  const renderList = (listNode: List) => {
    // 判断当前 List 是否需要 active（只有其下有 li 是 active 的时候才需要 active）
    let listActive = false

    // 渲染子内容（包含子列表）
    const listChildren = listNode.children.map((listItem, idx) => {
      // 判断当前 li 是否 active（判断 hash 和 li 中的实际 value 是否匹配）
      const currItemValue = getListItemValue(listItem)
      const currItemActive = currItemValue === activeHeading

      // li 下的 list 是否存在 active
      let childrenActive = false

      const itemChildren = listItem.children.map((child, _idx) => {
        if (child.type === 'list') {
          const { list, isActive } = renderList(child)
          // 子 list 是否为 active
          childrenActive = isActive
          return list
        }

        // 获取当前标题的 level
        const level = headingNodes.find(node => getNodeValue(node.children) === currItemValue)?.level

        // return null
        return (
          <div key={_idx} className={classnames(styles.itemValueNode, { [`h${level}`]: level !== undefined })}>
            <StructuredText data={child as any} />
          </div>
        )
      })

      // 当前 <li> 是否需要 active
      const shouldListItemActive = currItemActive || childrenActive
      // 判断当前 <ul> 是否需要 active
      listActive = listActive || shouldListItemActive

      return (
        <li key={idx} className={classnames(styles.tocListItem, { [styles.active]: shouldListItemActive })}>
          {itemChildren}
        </li>
      )
    })

    return {
      list: <ul>{listChildren}</ul>,
      isActive: listActive,
    }
  }

  console.log({ tree, table })

  return (
    <div className={classnames(styles.toc, { [styles.overview]: activeHeading === null })}>
      {/*{table && <StructuredText data={table.map as any} />}*/}
      {table.map && renderList(table.map).list}
    </div>
  )
}

export default PostToc
