import React from 'react'
import { Image } from 'react-datocms'

const ImageBlock: React.FC<{
  record?: any;
}> = props => {
  const { record } = props

  return <Image data={(record.image as any).responsiveImage} />
}

export default ImageBlock
