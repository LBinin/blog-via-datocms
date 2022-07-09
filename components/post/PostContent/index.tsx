import React from 'react'
import { renderNodeRule, StructuredText } from 'react-datocms'
import ImageBlock from '@/components/block/ImageBlock'
import { isCode, isHeading } from 'datocms-structured-text-utils'
import Heading from '@/components/block/Heading'

import LightGallery from 'lightgallery/react'
// import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgRotate from 'lightgallery/plugins/rotate'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

import styles from './index.module.scss'
import CodeBlock from '@/components/block/CodeBlock'

const PostContent: React.FC<{
  dataSource?: any;
  theme?: string; // 主题色
}> = props => {
  const { dataSource, theme } = props
  return (
    <div
      className={`prose prose-bigno dark:prose-invert max-w-full font-normal px-5 md:px-10 ${styles.postContent}`}
      style={{ '--post-content-theme': theme ?? '#e54d42' } as any}
    >
      <LightGallery
        plugins={[lgZoom, lgRotate, lgFullscreen]}
        hideScrollbar={true}
        selector=".bigno-blog-image"
        licenseKey="DO_NOT_WARNING_ON_CONSOLE"
      >
        <StructuredText
          data={dataSource}
          customNodeRules={[
            renderNodeRule(
              isHeading,
              (ctx) => <Heading key={ctx.key} ctx={ctx} />,
            ),
            renderNodeRule(
              isCode,
              (ctx) => <CodeBlock key={ctx.key} record={ctx}/>
            )
          ]}
          renderBlock={({ record }) => {
            if (record.__typename === 'ImageBlockRecord') {
              return <ImageBlock record={record} />
            }

            if (record.__typename === 'CodeBlockRecord') {
              return <CodeBlock record={record}/>
            }

            console.log('unknow block:', record)

            return (
              <>
                <p>Don't know how to render a block!</p>
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
