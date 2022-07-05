import React from 'react'
import { renderNodeRule, StructuredText } from 'react-datocms'
import ImageBlock from '@/components/block/ImageBlock'
import { isHeading} from 'datocms-structured-text-utils'
import Heading from '@/components/block/Heading'

import LightGallery from 'lightgallery/react'
// import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgRotate from 'lightgallery/plugins/rotate'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

const PostContent: React.FC<{
  dataSource?: any;
}> = props => {
  const { dataSource } = props
  return (
    <div className="prose max-w-full font-normal px-5 md:px-10">
      <LightGallery
        plugins={[lgZoom, lgRotate, lgFullscreen]}
        hideScrollbar={true}
        selector=".bigno-blog-image"
      >
        <StructuredText
          data={dataSource}
          customNodeRules={[
            renderNodeRule(
              isHeading,
              (ctx) => <Heading ctx={ctx} />,
            ),
          ]}
          renderBlock={({ record }) => {
            if (record.__typename === 'ImageBlockRecord') {
              return <ImageBlock record={record} />
            }

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
