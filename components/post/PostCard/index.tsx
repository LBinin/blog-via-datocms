import React from 'react'
import { Image } from 'react-datocms'
import Avatar from '@/components/base/Avatar'
import Date from '@/components/base/Date'

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

  console.log({ post })

  return (
    <div className="w-[600px] flex items-stretch m-4 border rounded-md overflow-hidden relative">
      <div className="w-[45%] shrink-0">
        <Image
          className="ring-1 ring-gray-100 dark:ring-midnight-200 h-full"
          objectFit="cover"
          data={{
            ...post.coverImage?.responsiveImage,
            alt: `Cover Image for ${post.title}`,
          }}
        />
      </div>

      <div className="p-5 flex-1 flex flex-col overflow-auto">
        <div className="font-bold text-xl break-all line-clamp-3 shrink-0">{ post.title }</div>
        <div className="text-sm text-gray-500 my-3 flex-1">{ post.excerpt }</div>

        {/* 头像和利器 */}
        <div className="flex items-center justify-between">
          <Avatar
            avatarClass="w-6 h-6"
            nameClass="text-xs"
            name={post.author?.name}
            picture={post.author?.picture.responsiveImage}
          />
          <Date className="text-sm text-zinc-400" time={post.date}/>
        </div>
      </div>
    </div>
  )
}

export default PostCard
