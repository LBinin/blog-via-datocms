import React from 'react'
import { renderMarkRule, renderNodeRule, StructuredText } from 'react-datocms'
import ImageBlock from '@/components/block/ImageBlock'
import { isHeading, isParagraph } from 'datocms-structured-text-utils'
import Heading from '@/components/block/Heading'

const PostContent: React.FC<{
  dataSource?: any;
}> = props => {
  const { dataSource } = props
  return (
    <div className="prose max-w-full font-normal px-5 md:px-10">
      <StructuredText
        data={dataSource}
        customNodeRules={[
          renderNodeRule(isHeading, (ctx) => <Heading ctx={ctx}/>),
        ]}
        // renderNode={console.log}
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
    </div>
  )
}

export default PostContent
