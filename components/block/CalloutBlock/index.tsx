import React from 'react'
import { StructuredText } from 'react-datocms'
import { CalloutBlockRecord } from '@/typing/block'

const CalloutBlock: React.FC<{
  record: CalloutBlockRecord
}> = props => {
  const { record } = props
  const { emojiIcon, title, content } = record

  return (
    <div className="my-5 flex space-x-4 rounded-lg border p-5 pb-2">
      <span className="text-lg">{emojiIcon}</span>
      <div>
        <div className="-mb-2 font-bold">{title}</div>
        <StructuredText data={content} />
      </div>
    </div>
  )
}

export default CalloutBlock
