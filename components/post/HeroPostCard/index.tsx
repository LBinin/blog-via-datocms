import React from 'react'
import { Image } from 'react-datocms'
import Avatar from '@/components/base/Avatar'
import Date from '@/components/base/Date'
import Link from 'next/link'
import MarkedText from '@/components/base/MarkedText'

const HeroPostCard: React.FC<{
  post?: any
}> = props => {
  const { post } = props

  if (!post) {
    return null
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <a
        aria-label={post.title}
        className="group relative block overflow-hidden md:rounded-md md:border"
      >
        <Image
          className="transition duration-500 md:group-hover:scale-110"
          data={{
            ...post.coverImage?.responsiveImage,
            alt: `Cover Image for ${post.title}`,
          }}
        />

        {/*  md:absolute bottom-0 left-0 */}
        <div className="bottom-0 left-0 inline-flex flex-col items-start space-y-1 p-4 transition duration-300 md:absolute md:space-y-2 md:group-hover:opacity-30">
          {/* 文章标题 */}
          <MarkedText
            className="inline-block bg-white px-2 py-1 text-2xl font-bold tracking-wide text-gray-700"
            text={post.title}
          />

          {/* 作者及日期 */}
          <div className="inline-flex items-center space-x-5 bg-white px-2 py-1">
            <Avatar
              avatarClass="w-4 h-4"
              nameClass="text-xs"
              name={post.author?.name}
              picture={post.author?.picture.responsiveImage}
            />
            <Date className="text-xs text-zinc-400" time={post.date} />
          </div>

          {/* 摘要 */}
          {post.excerpt && (
            <p className="max-w-sm bg-white px-2 py-1 text-sm font-bold text-gray-400">
              {post.excerpt}
            </p>
          )}
        </div>
      </a>
    </Link>
  )
}

export default HeroPostCard
