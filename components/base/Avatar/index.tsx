import React from 'react'
import { Image } from 'react-datocms'
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'

const Avatar: React.FC<{
  name?: string;
  picture?: ResponsiveImageType;
}> = props => {
  const { picture, name } = props

  return (
    <div className="flex items-center">
      <div className="w-6 md:w-10 h-6 md:h-10">
        {picture && (
          <Image
            // alt={name ?? ''}
            data={picture}
            className="rounded-full"
          />
        )}
      </div>
      {name && <div className="ml-2 md:ml-4 text-xs md:text-base font-semibold tracking-wider text-zinc-500">{name}</div>}
    </div>
  )
}

export default Avatar
