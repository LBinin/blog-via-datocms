import React from 'react'
import { getNodeValue } from '@/util'
import { List, ListContent } from 'mdast'
import useTocAst from '@/hooks/useTocAst'
import { StructuredText } from 'react-datocms'
import useActiveHeading from '@/hooks/useActiveHeading'
import { Node } from 'datocms-structured-text-utils/dist/types/types'

const getListItemValue = (listItem: ListContent) => {
  const itemNode = listItem.children.filter(child => child.type !== 'list')
  return getNodeValue(itemNode as any)
}

type SectionClassFunction = (active: boolean) => string

/**
 * 渲染 TOC 列表
 * @param props
 * @constructor
 */
const TocList: React.FC<{
  dataSource?: Node[];
  sectionClass?: string | SectionClassFunction;
  titleNodeClass?: string;
  className?: string;
}> = props => {
  const { dataSource, titleNodeClass, sectionClass, className } = props
  const activeHeading = useActiveHeading(dataSource)
  const toc = useTocAst(dataSource)

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
        // const level = headingNodes.find(node => getNodeValue(node.children) === currItemValue)?.level

        return (
          <div key={_idx} className={titleNodeClass}>
            <StructuredText data={child as any} />
            {/*{getNodeValue(child as any)}*/}
          </div>
        )
      })

      // 当前 <li> 是否需要 active
      const shouldListItemActive = currItemActive || childrenActive
      // 判断当前 <ul> 是否需要 active
      listActive = listActive || shouldListItemActive

      const sectionCls = typeof sectionClass === 'function' ? sectionClass(shouldListItemActive) : sectionClass
      return (
        <li key={idx} className={sectionCls}>
          {itemChildren}
        </li>
      )
    })

    return {
      list: <ul key="list" className={className}>{listChildren}</ul>,
      isActive: listActive,
    }
  }

  return toc && renderList(toc).list
}

export default TocList
