import React from 'react'
import { Image } from 'react-datocms'
import { IMAGE_CLASSNAME } from '@/const/block'
import type { ImageBlockRecord } from '@/typing/block'

const ImageBlock: React.FC<{
  record?: ImageBlockRecord
}> = props => {
  const { record } = props
  const responsiveImage = record?.image?.responsiveImage

  if (!responsiveImage) return null

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
