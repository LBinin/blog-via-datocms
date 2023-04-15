import React from 'react'
import cx from 'classnames'

interface UnderlineProps extends React.HTMLAttributes<HTMLSpanElement> {
}

const Underline: React.FC<UnderlineProps> = props => {
  const { children, ...spanProps } = props
  const spanClassName = cx('relative custom-underline', spanProps.className)

  return (
    <span {...spanProps} className={spanClassName}>
      {children}
    </span>
  )
}

export default Underline
