import React from 'react'
import { StructuredText } from 'react-datocms'

const CalloutBlock: React.FC<{
  record?: any;
}> = props => {
  const { record } = props

  console.log({ record })

  const { emojiIcon, calloutTitle, calloutContent, calloutColor } = record

  return (
    <div className="my-5 flex p-5 pb-2 border rounded-lg space-x-4">
      <span className="text-lg">{emojiIcon}</span>
      <div>
        <div className="-mb-2 font-bold">{calloutTitle}</div>
        <StructuredText data={calloutContent}/>
      </div>
    </div>
  )
}

export default CalloutBlock
