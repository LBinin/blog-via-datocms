import { useScroll, useSize } from 'ahooks'
import useDocument from '@/hooks/useDocument'
import { getDOMOffset, getNodeValue } from '@/util'
import { useEffect, useMemo, useState } from 'react'
import { isHeading } from 'datocms-structured-text-utils'
import { Heading, Node } from 'datocms-structured-text-utils/dist/types/types'

/**
 * 获取当前页面滚动到的标题（用于 Post 页面）
 */
const useActiveHeading = (dataSource?: Node[]) => {
  const doc = useDocument()
  const scroll = useScroll(doc)
  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  // 获取所有标题节点
  const headingNodes = useMemo(() => dataSource?.filter(node => isHeading(node)) as Heading[], [dataSource])

  const bodySize = useSize(() => doc?.querySelector('body'))
  const windowHigh = useMemo(() => doc?.documentElement.clientHeight, [bodySize])

  // 页面滚动监听当前所在标题节点
  useEffect(() => {
    const topOffset = ((windowHigh ?? 20) - 200) / 2 // 标题距离顶部多少算 active

    if (!headingNodes?.length) {
      return
    }
    const firstNodeOffsetTop = getDOMOffset(getNodeValue(headingNodes[0])).top

    if (
      scroll?.top === undefined ||
      scroll.top < firstNodeOffsetTop - topOffset
    ) {
      setActiveHeading(null)
      return
    }

    // 获取所有节点高度
    const headingOffsetList = headingNodes.map(node => {
      const slug = getNodeValue(node)
      return {
        slug,
        ...getDOMOffset(slug),
      }
    })

    const index = headingOffsetList.reverse().findIndex(({ top }) =>
      (scroll?.top ?? Infinity) > top - topOffset, // 减去 1px 防止小数点没对齐
    )

    // 变更当前 Heading
    setActiveHeading(headingOffsetList[index].slug)
  }, [scroll?.top, windowHigh])

  return activeHeading
}

export default useActiveHeading
