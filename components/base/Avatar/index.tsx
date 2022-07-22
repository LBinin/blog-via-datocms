import React from 'react'
import classnames from 'classnames'
import { Image } from 'react-datocms'
import { ResponsiveImageType } from 'react-datocms/dist/types/Image'

const Avatar: React.FC<{
  name?: string
  picture?: ResponsiveImageType
  avatarClass?: string
  nameClass?: string
}> = props => {
  const { picture, name, nameClass, avatarClass } = props

  const avatarCls = classnames('overflow-hidden rounded-full', avatarClass)
  const nameCls = classnames(
    'font-semibold tracking-wider text-zinc-500',
    nameClass
  )

  return (
    <div className="flex items-center space-x-1">
      <div className={avatarCls}>{picture && <Image data={picture} />}</div>
      {name && <div className={nameCls}>{name}</div>}
    </div>
  )
}

export default Avatar
