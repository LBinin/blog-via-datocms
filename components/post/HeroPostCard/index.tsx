import React from 'react'
import Link from 'next/link'
import { Image } from 'react-datocms'
import Date from '@/components/base/Date'
import Avatar from '@/components/base/Avatar'
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
        className="group relative grid overflow-hidden md:rounded-md md:border md:dark:border-black"
      >
        {/* 文章标题 */}
        <div className="relative z-[2] col-start-1 row-start-4 mx-3 my-3 flex items-center transition group-hover:opacity-50 md:row-start-2 md:my-0">
          {post.wip && (
            <div className="mr-3 inline-block flex h-full items-center bg-theme-red px-2 py-0.5 text-2xl font-bold text-white">
              WIP
            </div>
          )}

          <MarkedText
            className="inline-block bg-white px-2 py-1 text-2xl font-bold tracking-wide text-gray-700"
            text={post.title}
          />
        </div>

        <Image
          className="col-start-1 row-span-4 row-start-1 transition duration-500 group-hover:scale-110"
          data={{
            ...post.coverImage?.responsiveImage,
            alt: `Cover Image for ${post.title}`,
          }}
        />

        {/* 作者及日期 */}
        <div className="z-[2] col-start-1 mx-3 mt-3 text-[0px] transition group-hover:opacity-50 md:row-start-3">
          <div className="inline-flex items-center space-x-3 bg-white px-2 py-1.5">
            <Avatar
              avatarClass="w-6 h-6 border border-2 border-theme-red"
              nameClass="text-sm"
              name={post.author?.name}
              picture={post.author?.picture.responsiveImage}
            />
            <Date className="text-xs text-zinc-400" time={post.date} />
          </div>
        </div>

        {/* 摘要 */}
        <div className="z-[2] col-start-1 mx-3 my-1 max-w-sm transition group-hover:opacity-50 md:row-start-4 md:mb-3">
          {post.excerpt && (
            <p className="text-md inline-block bg-white px-2 py-1 font-bold text-gray-400 md:text-sm">
              {post.excerpt}
            </p>
          )}
        </div>
      </a>
    </Link>
  )
}

export default HeroPostCard
