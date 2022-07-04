import React, { useEffect, useMemo, useRef, useState } from 'react'
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

  const documentRef = useRef<any>(null)
  const scroll = useScroll(documentRef)

  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  useEffect(() => {
    documentRef.current = document
  }, [])

  // 获取所有标题节点
  const headingNodes = useMemo(() => dataSource?.filter(node => isHeading(node)) as Heading[], [dataSource])

  // 页面滚动监听当前所在标题节点
  useEffect(() => {
    const firstNodeOffsetTop = getDOMOffset(
      `#${getNodeValue(headingNodes[0])}`
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
      (scroll?.top ?? Infinity) < top - 1
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
      url: newUrl
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

  console.log({ tree, table, styles })

  const renderList = (list: List) => {
    const listCls = classnames(styles.tocList, {
      // [styles.active]: listValue
    })

    return (
      <ul className={listCls}>
        {list.children.map((listItem, idx) => {
          const currItemValue = getListItemValue(listItem)
          const currItemOffset = getDOMOffset(`#${currItemValue}`)

          let showItem = false

          // 最后一个
          if (idx === list.children.length - 1) {

          } else {
            const nextItemValue = getListItemValue(list.children[idx + 1])
            const nextItemOffset = getDOMOffset(`#${nextItemValue}`)

            if (
              (scroll?.top ?? 0) >= currItemOffset.top &&
              (scroll?.top ?? 0) <= nextItemOffset.top
            ) {
              showItem = true
            }
            // const {} = getDOMOffset()
          }
          const listValue = getNodeValue(listItem as any)
          const itemCls = classnames(styles.tocListItem, {
            [styles.active]: showItem
          })
          return (
            <li className={itemCls} key={idx}>
              {listItem.children.map((child, _idx) => child.type === 'list'
                ? renderList(child)
                : (<div><StructuredText key={_idx} data={child as any} /></div>)
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={`fixed top-[100px] right-[10px] ${styles.toc}`}>
      {/*{table && <StructuredText data={table.map as any} />}*/}
      {table.map && renderList(table.map)}
    </div>
  )
}

export default PostTOC
