import React from 'react'

interface BlockSummaryProps {
  title?: string
}

const BlockSummary: React.FC<BlockSummaryProps> = props => {
  const { title } = props

  if (!title) return null

  return (
    <div className="py-4 text-center text-sm opacity-60">{title}</div>
  )
}

export default BlockSummary;
