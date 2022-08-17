import React from 'react'
import { format, parseISO } from 'date-fns'

const Date: React.FC<{
  time?: string
  className?: string
}> = props => {
  const { time, className } = props

  if (!time) return null

  return (
    <time className={className} dateTime={time}>
      {format(parseISO(time), 'yyyy 年 MM 月	dd 日')}
    </time>
  )
}

export default Date
