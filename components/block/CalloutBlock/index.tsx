import React from 'react'
import { StructuredText } from 'react-datocms'
import { CalloutBlockRecord } from '@/typing/block'
import cx from 'classnames'

const CalloutBlock: React.FC<{
  record: CalloutBlockRecord
}> = props => {
  const { record } = props
  const { emojiIcon, title, content, color } = record

  const contentCls = cx('-mb-5', { '-mt-5': !title })

  return (
    <div
      className="my-5 flex space-x-4 rounded-lg bg-stone-100 p-5 dark:bg-stone-900"
      style={{ borderColor: color?.hex, backgroundColor: color?.hex }}
    >
      <span className="text-lg">{emojiIcon}</span>
      <div className={contentCls}>
        {title && <div className="-mb-2 text-lg font-bold">{title}</div>}
        <StructuredText data={content} />
      </div>
    </div>
  )
}

export default CalloutBlock
