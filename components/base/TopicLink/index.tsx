import React from 'react'
import Link from 'next/link'

/**
 * 话题链接
 * @param props
 * @constructor
 */
const TopicLink: React.FC<{
  name?: string
  slug?: string
}> = props => {
  const { slug, name } = props

  const content = (
    <>
      <span className="mr-0.5 text-[#E54D42]">#</span>
      {name}
    </>
  )

  if (!slug) {
    return content
  }

  return (
    <Link href={`/topics/${slug}`}>
      <a>{content}</a>
    </Link>
  )
}

export default TopicLink
