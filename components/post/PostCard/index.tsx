import React from 'react'
import { Image } from 'react-datocms'
import Avatar from '@/components/base/Avatar'
import Date from '@/components/base/Date'
import Link from 'next/link'
import MarkedText from '@/components/base/MarkedText'
import TopicLink from '@/components/base/TopicLink'
import { PostInfo } from '@/typing/post'

/**
 * 用于首页、更多推荐等地方的文章卡片
 */
const PostCard: React.FC<{
  post: PostInfo
}> = props => {
  const { post } = props

  return (
    <Link href={`/posts/${post.slug}`}>
      <a
        aria-label={post.title}
        className="group mx-5 my-10 flex flex-col items-stretch overflow-hidden rounded-md border transition duration-300 hover:shadow-xl dark:border-[#3c3c3d] md:mx-0 md:flex-row"
      >
        <div className="relative relative w-full shrink-0 md:w-[45%]">
          {post.wip && (
            <div className="absolute top-3 left-3 z-10 rounded bg-[#E54D42] px-1.5 py-0.5 text-sm font-bold text-white">
              WIP
            </div>
          )}
          <Image
            className="!max-w-full transition duration-300 md:h-full md:group-hover:scale-110"
            objectFit="cover"
            data={{
              ...post.coverImage?.responsiveImage!,
              alt: `Cover Image for ${post.title}`,
            }}
          />
        </div>

        <div className="ml-0 flex flex-1 flex-col overflow-auto p-4 transition-all duration-300 md:p-5 md:group-hover:ml-5">
          {post.category?.length && (
            <div className="mb-3 flex space-x-2">
              {post.category?.slice(0, 2).map(item => (
                <div
                  key={item.slug}
                  className="text-xs text-gray-500 dark:text-zinc-50"
                >
                  <TopicLink name={item.name} slug={item.slug} />
                </div>
              ))}
            </div>
          )}

          {/* 文章标题 */}
          <MarkedText
            className="block shrink-0 break-all text-xl font-bold md:line-clamp-3"
            text={post.title}
          />

          {/* 文章摘要 */}
          <div className="mt-3 flex-1 text-sm text-gray-500 dark:text-zinc-400">
            {post.excerpt}
          </div>

          {/* 头像和日期 */}
          <div className="mt-5 flex items-center justify-between">
            <Avatar
              avatarClass="w-5 h-5 border border-1 border-[#E54D42]"
              nameClass="text-sm"
              name={post.author?.name}
              picture={post.author?.picture.responsiveImage}
            />
            <Date
              className="text-sm text-zinc-400 dark:text-zinc-600"
              time={post.date}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostCard
