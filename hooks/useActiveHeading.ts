import { useEffect, useMemo, useState } from 'react'
import { getDOMOffset, getNodeValue } from '@/util'
import { useScroll } from 'ahooks'
import { isHeading } from 'datocms-structured-text-utils'
import { Heading, Node } from 'datocms-structured-text-utils/dist/types/types'
import useDocument from '@/hooks/useDocument'

/**
 * 获取当前页面滚动到的标题（用于 Post 页面）
 */
const useActiveHeading = (dataSource?: Node[]) => {
  const doc = useDocument()
  const scroll = useScroll(doc)
  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  // 获取所有标题节点
  const headingNodes = useMemo(() => dataSource?.filter(node => isHeading(node)) as Heading[], [dataSource])

  // 页面滚动监听当前所在标题节点
  useEffect(() => {
    if (!headingNodes?.length) {
      return
    }
    const firstNodeOffsetTop = getDOMOffset(
      `#${getNodeValue(headingNodes[0])}`,
    ).top

    if (
      scroll?.top === undefined ||
      scroll.top < firstNodeOffsetTop - 10
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
      (scroll?.top ?? Infinity) > top - 10, // 减去 1px 防止小数点没对齐
    )

    // console.log({ scroll: scroll?.top, headingOffsetList, index })
    // 变更当前 Heading
    setActiveHeading(headingOffsetList[index].slug)
  }, [scroll?.top])

  return activeHeading
}

export default useActiveHeading
