import styles from './index.module.scss'
import React, { useContext } from 'react'
import Heading from '@/components/block/Heading'
import ImageBlock from '@/components/block/ImageBlock'
import { renderNodeRule, StructuredText } from 'react-datocms'
import { isCode, isHeading, isLink } from 'datocms-structured-text-utils'
import { BLOG_THEME_COLOR_PRIMARY, IMAGE_CLASSNAME } from '@/const'

import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgRotate from 'lightgallery/plugins/rotate'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

import { PostContext } from '@/context/post'
import Anchor from '@/components/block/Anchor'
import CodeBlock from '@/components/block/CodeBlock'
import TableBlock from '@/components/block/TableBlock'
import CalloutBlock from '@/components/block/CalloutBlock'
import { isCalloutBlock, isCodeBlock, isImageBlock, isTableBlock } from '@/util/block'

const PostContent: React.FC<{
  theme?: string // 主题色
}> = props => {
  const { theme } = props

  const post = useContext(PostContext)

  return (
    <div
      className={`prose prose-bigno max-w-full px-5 font-normal dark:prose-invert md:px-10 ${styles.postContent}`}
      style={{ '--post-content-theme': theme || BLOG_THEME_COLOR_PRIMARY } as any}
    >
      <LightGallery
        plugins={[lgZoom, lgRotate, lgFullscreen]}
        hideScrollbar={true}
        selector={`.${IMAGE_CLASSNAME}`}
        licenseKey="DO_NOT_WARNING_ON_CONSOLE"
      >
        <StructuredText
          data={post.content}
          customNodeRules={[
            // !!! 修改的话别忘了改 covertStructuredTextToPlainText (不然 algolia 识别不了)
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
            // !!! 修改的话别忘了改 covertStructuredTextToPlainText (不然 algolia 识别不了)
            // 图像块
            if (isImageBlock(record)) {
              return <ImageBlock record={record} />
            }

            // 代码块（编辑器版本）
            if (isCodeBlock(record)) {
              return <CodeBlock record={record} />
            }

            if (isCalloutBlock(record)) {
              return <CalloutBlock record={record} />
            }

            if (isTableBlock(record)) {
              return <TableBlock record={record} />
            }

            console.log('unknown index.ts:', record)

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
