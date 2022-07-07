import React from 'react'
import { format, parseISO } from 'date-fns'

const Date: React.FC<{
  time?: string;
}> = props => {
  const { time } = props

  if (!time) {
    return null
  }

  return (
    <time
      className="text-xs md:text-base text-zinc-400"
      dateTime={time}
    >
      {format(parseISO(time), 'yyyy 年 MM 月	dd 日')}
    </time>
  )
}

export default Date
