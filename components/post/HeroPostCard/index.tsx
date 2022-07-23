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
        <div className="relative z-[2] col-start-1 row-start-4 mx-3 my-3 flex flex-col-reverse items-start md:row-start-2 md:my-0">
          <MarkedText
            className="inline-block bg-white px-2 py-1 text-2xl font-bold tracking-wide text-gray-700"
            text={post.title}
          />
        </div>

        <Image
          className="col-start-1 row-span-4 row-start-1 transition duration-500"
          data={{
            ...post.coverImage?.responsiveImage,
            alt: `Cover Image for ${post.title}`,
          }}
        />

        {/* 作者及日期 */}
        <div className="z-[2] col-start-1 mx-2 mt-2 text-[0px] md:row-start-3 md:mx-3 md:mt-3">
          <div className="inline-flex items-center space-x-5 bg-white px-2 py-1">
            <Avatar
              avatarClass="w-4 h-4 border border-1 border-[#E54D42]"
              nameClass="text-xs"
              name={post.author?.name}
              picture={post.author?.picture.responsiveImage}
            />
            <Date className="text-xs text-zinc-400" time={post.date} />
          </div>
        </div>

        {/* 摘要 */}
        {post.excerpt && (
          <div className="z-[2] col-start-1 mx-2 my-1 max-w-sm md:row-start-4 md:mx-3 md:my-3">
            <p className="text-md inline-block bg-white px-2 py-1 font-bold text-gray-400 md:text-sm">
              {post.excerpt}
            </p>
          </div>
        )}
      </a>
    </Link>
  )
}

export default HeroPostCard
