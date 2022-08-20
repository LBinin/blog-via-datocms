import React from 'react'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const Date: React.FC<{
  time?: string
  className?: string
}> = props => {
  const { time, className } = props

  if (!time) return null

  const timeStr = dayjs(time).format('YYYY 年 MM 月 DD 日')

  return (
    <time className={className} dateTime={time} title={timeStr}>
      {dayjs(time).fromNow(false)}
    </time>
  )
}

export default Date
