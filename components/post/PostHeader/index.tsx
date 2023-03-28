import React, { useContext } from 'react'
import Avatar from '@/components/base/Avatar'
import { Image } from 'react-datocms'
import Date from '@/components/base/Date'
import { PostContext } from '@/context/post'
import useReadingTime from '@/hooks/useReadingTime'

const PostHeader: React.FC = _ => {
  const { title, date, author, coverImage, wip, content } =
    useContext(PostContext)

  const { timeString } = useReadingTime(content)

  return (
    <>
      {/* 文章头图 */}
      <Image
        className="block md:rounded-lg shadow-me"
        data={{
          ...coverImage?.responsiveImage!,
          alt: `Cover Image for ${title}`,
        }}
      />

      <div className="mt-8 mb-14 px-5 md:mt-14 md:mb-20 md:px-10">
        {/* 文章标题 */}
        <h1 className="mb-8 text-2xl font-bold leading-normal md:mb-10 md:text-4xl">
          {wip && (
            <div
              className="mr-2 inline-block select-none rounded bg-[#E54D42] px-2 py-0.5 align-[16%] text-xl text-white"
              title="Work In Progress"
            >
              WIP
            </div>
          )}
          {title}
        </h1>

        {/* 作者信息及日期 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar
              avatarClass="w-6 md:w-10 h-6 md:h-10"
              nameClass="text-xs md:text-base !ml-3"
              name={author?.name}
              picture={author?.picture.responsiveImage}
            />
          </div>

          <div className="text-xs text-zinc-400 md:text-base">
            <Date time={date} />
            <span className="mx-1 select-none">・</span>
            <span>{timeString}</span>
          </div>
        </div>

        {wip && (
          <div className="mt-10 -mb-5 flex items-center rounded bg-amber-400 py-2 px-3 font-bold text-white opacity-100">
            <svg
              className="mr-1.5 inline-block h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
            该文章编写中，最终发表内容可能存在出入。
          </div>
        )}
      </div>
    </>
  )
}

export default PostHeader
