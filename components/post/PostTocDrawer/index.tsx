import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './index.module.scss'
import useDocument from '@/hooks/useDocument'
import TocList from '@/components/base/TocList'
import { useTransition, animated } from 'react-spring'
import { Node } from 'datocms-structured-text-utils/dist/types/types'

const PostTocDrawer: React.FC<{
  visible?: boolean;
  onClose?(): void;
  dataSource?: Node[]
}> = props => {
  const { dataSource, visible, onClose } = props
  const overflowFlag = useRef(false)
  const doc = useDocument()

  const transitions = useTransition(visible, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
    reverse: visible,
  })

  useEffect(() => {
    if (!doc) {
      return
    }
    if (visible) {
      overflowFlag.current = true
      doc.documentElement.style.overflow = 'hidden'
    } else {
      if (overflowFlag.current) {
        overflowFlag.current = false
        doc.documentElement.style.overflow = ''
      }
    }
  }, [doc, visible])

  const drawer = transitions((style, isVisible) => isVisible && (
    <div id="post-menu-portal" className={classnames('fixed flex inset-0 z-40 overflow-hidden flex-col-reverse')}>
      {/* 遮罩层 */}
      <div className="absolute inset-0 opacity-100" onClick={onClose}></div>

      <animated.div style={style} className={classnames('pointer-events-none inset-0 z-40 flex flex-col-reverse')}>
        <div className={classnames('shadow-2xl shadow-sky-50 dark:ring-white/10 shadow-black ring-black/10 flex flex-col rounded-tl-2xl rounded-tr-2xl backdrop-blur backdrop-filter bg-white dark:bg-black/80 bg-opacity-80 border-opacity-10 border-r border-white firefox:bg-opacity-90 h-[60vh] pointer-events-auto')}>
          <div className="flex justify-center items-center space-x-2 pt-3 pb-2 border-b border-black/10 dark:border-white/10 mx-5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            <span className="text-lg font-bold pr-2">目录</span>
          </div>
          <div className={classnames(styles.toc, 'flex-1 overflow-auto pt-2 px-5 pb-5')}>
            <TocList
              // className="overflow-auto"
              dataSource={dataSource}
              sectionClass={active => classnames(styles.section, { [styles.active]: active })}
              titleNodeClass={styles.title}
            />
          </div>
        </div>
      </animated.div>
    </div>
  ))

  return doc ? ReactDOM.createPortal(drawer, doc.querySelector('#__next')!) : null
}

export default PostTocDrawer
