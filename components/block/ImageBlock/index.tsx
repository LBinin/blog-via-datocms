import React from 'react'
import { Image } from 'react-datocms'
import type { ResponsiveImageType } from 'react-datocms/dist/types/Image'
import { IMAGE_CLASSNAME } from '@/const/block'

const ImageBlock: React.FC<{
  record?: any
}> = props => {
  const { record } = props

  const responsiveImage = (record.image as any)
    .responsiveImage as ResponsiveImageType

  return (
    <figure
      className={IMAGE_CLASSNAME}
      data-src={responsiveImage.src}
      data-sub-html={
        responsiveImage.title ? `<h3>${responsiveImage.title}</h3>` : ''
      }
      data-download-url={`${responsiveImage.src}&dl`}
    >
      <Image data={responsiveImage} />
      {responsiveImage.title && (
        <figcaption className="text-center text-zinc-400">
          {responsiveImage.title}
        </figcaption>
      )}
    </figure>
  )
  // return <Image data={(record.image as any).responsiveImage} />
}

export default ImageBlock
