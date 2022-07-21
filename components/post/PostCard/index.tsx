import React from 'react'
import { Image } from 'react-datocms'
import Avatar from '@/components/base/Avatar'
import Date from '@/components/base/Date'
import Link from 'next/link'

/**
 * 用于首页、更多推荐等地方的文章卡片
 */
const PostCard: React.FC<{
  post?: any
}> = props => {
  const { post } = props

  if (!post) {
    return null
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <a aria-label={post.title} className="flex items-stretch my-10 border rounded-md overflow-hidden transition duration-300 hover:shadow-xl group">
        <div className="w-[45%] shrink-0">
          <Image
            className="h-full transition duration-300 group-hover:scale-110"
            objectFit="cover"
            data={{
              ...post.coverImage?.responsiveImage,
              alt: `Cover Image for ${post.title}`,
            }}
          />
        </div>

        <div className="p-5 flex-1 flex flex-col overflow-auto ml-0 transition-all duration-300 group-hover:ml-5">
          <div className="font-bold text-xl break-all line-clamp-3 shrink-0">{post.title}</div>
          <div className="text-sm text-gray-500 my-3 flex-1">{post.excerpt}</div>

          {/* 头像和日期 */}
          <div className="flex items-center justify-between">
            <Avatar
              avatarClass="w-6 h-6"
              nameClass="text-xs"
              name={post.author?.name}
              picture={post.author?.picture.responsiveImage}
            />
            <Date className="text-sm text-zinc-400" time={post.date} />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostCard
