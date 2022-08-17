import { useMemo } from 'react'
import {
  countPostContent,
  readingTimeCounter,
  readingTimeString,
} from '@/util/reading'
import { StructuredText as StructuredTextGraphQlResponse } from 'datocms-structured-text-utils/dist/types/types'

const useReadingTime = (content?: StructuredTextGraphQlResponse) => {
  const { imageCount, text } = useMemo(
    () => countPostContent(content),
    [content]
  )

  const time = useMemo(
    () => readingTimeCounter(text, imageCount),
    [text, imageCount]
  )

  const timeString = readingTimeString(time)

  return {
    time,
    timeString,
    imageCount,
    text,
  }
}

export default useReadingTime
