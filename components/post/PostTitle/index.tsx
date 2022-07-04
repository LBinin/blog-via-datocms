import React from 'react'
import { PostAuthorInfo } from '@/model'
import { parseISO, format } from 'date-fns'
import Avatar from '@/components/base/Avatar'
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'
import { Image } from 'react-datocms'

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
          className="md:rounded-lg"
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
          <Avatar name={author?.name} picture={author?.picture.responsiveImage} />
          {date && <time className="text-xs md:text-base text-zinc-400" dateTime={date}>{format(parseISO(date), 'yyyy 年 MM 月	dd 日')}</time>}
        </div>
      </div>
    </div>
  )
}

export default PostTitle
