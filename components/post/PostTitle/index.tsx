import React from 'react'
import { PostAuthorInfo } from '@/model'
import Avatar from '@/components/base/Avatar'
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'
import { Image } from 'react-datocms'
import Date from '@/components/base/Date'

const PostTitle: React.FC<{
  // 文章标题
  title?: string;
  // 作者信息
  author?: PostAuthorInfo;
  // 日期
  date?: string;
  // 封面图片
  coverImage?: ResponsiveImageType;
  // 是否 WIP
  wip?: boolean;
}> = props => {
  const { title, author, date, coverImage, wip } = props

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
          {wip && (
            <div className="inline-block bg-[#E54D42] px-2 mr-2 text-white rounded py-0.5 text-base align-[28%]">WIP</div>
          )}
          {title?.repeat(1)}
        </h1>

        {/* 作者信息及日期 */}
        <div className="flex items-center justify-between">
          <Avatar
            avatarClass="w-6 md:w-10 h-6 md:h-10"
            nameClass="text-xs md:text-base"
            name={author?.name}
            picture={author?.picture.responsiveImage}
          />
          <Date className="text-xs md:text-base text-zinc-400" time={date} />
        </div>

        {wip && (
          <div className="mt-10 bg-amber-400 text-white font-bold opacity-100 rounded py-2 px-3 -mb-5 flex items-center">
            <svg className="inline-block w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            该文章编写中，最终发表内容可能存在出入。
          </div>
        )}
      </div>
    </div>
  )
}

export default PostTitle
