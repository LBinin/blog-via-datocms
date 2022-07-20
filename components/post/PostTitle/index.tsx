import React from 'react'
import { PostAuthorInfo } from '@/model'
import { parseISO, format } from 'date-fns'
import Avatar from '@/components/base/Avatar'
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'
import { Image } from 'react-datocms'
import Date from '@/components/base/Date'

const PostTitle: React.FC<{
  title?: string;
  author?: PostAuthorInfo;
  date?: string;
  coverImage?: ResponsiveImageType;
}> = props => {
  const { title, author, date, coverImage } = props

  return (
    <div>
      {/* 文章头图 */}
      <div className="">
        <Image
          className="md:rounded-lg ring-1 ring-gray-100 dark:ring-midnight-200"
          data={{
            ...coverImage!,
            alt: `Cover Image for ${title}`,
          }}
        />
      </div>

      <div className="mt-8 md:mt-14 px-5 md:px-10 mb-14 md:mb-20">
        {/* 文章标题 */}
        <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 leading-normal">
          {title}
        </h1>

        {/* 作者信息及日期 */}
        <div className="flex items-center justify-between">
          <Avatar
            avatarClass="w-6 md:w-10 h-6 md:h-10"
            nameClass="text-xs md:text-base"
            name={author?.name}
            picture={author?.picture.responsiveImage}
          />
          <Date className="text-xs md:text-base text-zinc-400" time={date}/>
        </div>
      </div>
    </div>
  )
}

export default PostTitle
