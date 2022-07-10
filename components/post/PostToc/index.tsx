import React from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useDebounceEffect } from 'ahooks'
import TocList from '@/components/base/TocList'
import useActiveHeading from '@/hooks/useActiveHeading'
import { Heading, Node } from 'datocms-structured-text-utils/dist/types/types'

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

  // 获取当前所处标题
  const activeHeading = useActiveHeading(dataSource)

  // 动态修改 Hash
  // https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-active-header-links/clientRootMixin.js
  useDebounceEffect(() => {
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
  }, [activeHeading], { wait: 300 })

  return (
    <div className={classnames(styles.toc, { [styles.overview]: activeHeading === null })}>
      {/*{toc && renderList(toc).list}*/}
      <TocList
        dataSource={dataSource}
        sectionClass={active => classnames(styles.tocListItem, { [styles.active]: active })}
        titleNodeClass={styles.itemValueNode}
      />
    </div>
  )
}

export default PostToc
