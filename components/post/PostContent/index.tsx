import React, { useContext } from 'react'
import { renderNodeRule, StructuredText } from 'react-datocms'
import ImageBlock from '@/components/block/ImageBlock'
import { isCode, isHeading, isLink } from 'datocms-structured-text-utils'
import Heading from '@/components/block/Heading'

import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgRotate from 'lightgallery/plugins/rotate'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

import styles from './index.module.scss'
import CodeBlock from '@/components/block/CodeBlock'
import Anchor from '@/components/block/Anchor'
import CalloutBlock from '@/components/block/CalloutBlock'
import TableBlock from '@/components/block/TableBlock'
import { IMAGE_CLASSNAME, MyBlock } from '@/const/block'
import { PostContext } from '@/context/post'

const PostContent: React.FC<{
  // dataSource?: any
  theme?: string // 主题色
}> = props => {
  const { theme } = props

  const { content } = useContext(PostContext)

  return (
    <div
      className={`prose prose-bigno max-w-full px-5 font-normal dark:prose-invert md:px-10 ${styles.postContent}`}
      style={{ '--post-content-theme': theme ?? '#e54d42' } as any}
    >
      <LightGallery
        plugins={[lgZoom, lgRotate, lgFullscreen]}
        hideScrollbar={true}
        selector={`.${IMAGE_CLASSNAME}`}
        licenseKey="DO_NOT_WARNING_ON_CONSOLE"
      >
        <StructuredText
          data={content}
          customNodeRules={[
            // 标题节点
            renderNodeRule(isHeading, ctx => (
              <Heading key={ctx.key} ctx={ctx} />
            )),
            // 普通代码块
            renderNodeRule(isCode, ctx => (
              <CodeBlock key={ctx.key} record={ctx} />
            )),
            // 链接
            renderNodeRule(isLink, ctx => <Anchor key={ctx.key} ctx={ctx} />),
          ]}
          renderBlock={({ record }) => {
            // 图像块
            if (record.__typename === MyBlock.Image) {
              return <ImageBlock record={record} />
            }

            // 代码块（编辑器版本）
            if (record.__typename === MyBlock.Code) {
              return <CodeBlock record={record} />
            }

            if (record.__typename === MyBlock.Callout) {
              return <CalloutBlock record={record} />
            }

            if (record.__typename === MyBlock.Table) {
              return <TableBlock record={record} />
            }

            console.log('unknown block:', record)

            return (
              <>
                <p>Don't know how to render a block!</p>
                {/*<CodeBlock key={record.id} record={record}/>*/}
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            )
          }}
        />
      </LightGallery>
    </div>
  )
}

export default PostContent
