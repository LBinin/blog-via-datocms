import React from 'react'
import { MarkdownRecord } from '@/components/block/types'
import MarkdownRenderer from '@/components/markdown'

interface MarkdownProps {
  record?: MarkdownRecord
}

const MarkdownBlock: React.FC<MarkdownProps> = props => {
  const { record } = props

  if (!record?.content) return null

  return <MarkdownRenderer content={record.content}/>
}

export default MarkdownBlock
