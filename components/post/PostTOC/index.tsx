import React, { useEffect, useMemo, useState } from 'react'
import { Heading, Node } from 'datocms-structured-text-utils/dist/types/types'
import { isHeading } from 'datocms-structured-text-utils'
import { toc } from 'mdast-util-toc'
import { u } from 'unist-builder'
import { StructuredText } from 'react-datocms'
import styles from './index.module.scss'
import { useScroll } from 'ahooks'
import { getDOMOffset, getNodeValue } from '@/util'
import { List, ListContent } from 'mdast'
import classnames from 'classnames'

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

const PostTOC: React.FC<{
  dataSource?: Node[]
}> = props => {
  const { dataSource } = props

  const [scrollTarget, setScrollTarget] = useState<any>()
  const scroll = useScroll(scrollTarget)

  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  useEffect(() => {
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

    const index = headingOffsetList.findIndex(({ top }) =>
      (scroll?.top ?? Infinity) < top - 1,
    ) - 1

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
  const tree = u(
    'root',
    headingNodes.map(node => u('heading', { depth: node.level }, node.children)),
  )
  const table = toc(tree as any, {
    ordered: false,
  })

  // console.log({ tree, table, styles })

  const renderList = (listNode: List) => {
    let listActive = false

    // 渲染子内容（包含子列表）
    const listChildren = listNode.children.map((listItem, idx) => {
      const currItemValue = getListItemValue(listItem)
      const currItemActive = currItemValue === activeHeading

      // 当前 item 就是 active item

      let childrenActive = false

      const itemChildren = listItem.children.map((child, _idx) => {
        if (child.type === 'list') {
          const { list, isActive } = renderList(child)
          // 子 list 为 active
          childrenActive = isActive
          return list
        }

        return <div><StructuredText key={_idx} data={child as any} /></div>
      })

      // 当前 <li> 是否需要 active
      const shouldListItemActive = currItemActive || childrenActive
      // 判断当前 <ul> 是否需要 active
      listActive = listActive || shouldListItemActive

      return (
        <li
          className={classnames(styles.tocListItem, { [styles.active]: shouldListItemActive })}
          key={idx}
        >
          {itemChildren}
        </li>
      )
    })

    return {
      list: (
        <ul className={classnames(styles.tocList)}>
          {listChildren}
        </ul>
      ),
      isActive: listActive,
    }
  }

  return (
    <div className={`fixed top-[100px] right-[10px] ${styles.toc} ${activeHeading === null ? styles.overview : ''}`}>
      {/*{table && <StructuredText data={table.map as any} />}*/}
      {table.map && renderList(table.map).list}
    </div>
  )
}

export default PostTOC
