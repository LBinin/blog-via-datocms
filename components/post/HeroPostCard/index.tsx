import React from 'react'
import { Image } from 'react-datocms'
import Avatar from '@/components/base/Avatar'
import Date from '@/components/base/Date'
import Link from 'next/link'

const HeroPostCard: React.FC<{
  post?: any
}> = props => {
  const { post } = props

  if (!post) {
    return null
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <a aria-label={post.title} className="block rounded-md overflow-hidden border relative">
        <Image
          data={{
            ...post.coverImage?.responsiveImage,
            alt: `Cover Image for ${post.title}`,
          }}
        />

        <div className="p-4 absolute bottom-0 left-0">
          <div className="flex items-center space-x-5 bg-white p-1">
            <Avatar
              avatarClass="w-6 h-6"
              nameClass="text-xs"
              name={post.author?.name}
              picture={post.author?.picture.responsiveImage}
            />
            <Date className="text-xs text-zinc-400" time={post.date} />
          </div>

          <p className="text-2xl font-bold mt-3 tracking-wide text-gray-700 bg-white p-1">{post.title}</p>
          <p className="text-sm text-gray-400 mt-2 font-bold bg-white p-1">{post.excerpt}</p>
        </div>
      </a>
    </Link>
  )
}

export default HeroPostCard
