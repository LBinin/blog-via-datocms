import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useInViewport } from 'ahooks'

// 不同的状态
enum Stage {
  // 写作中
  Writing,
  // 注意到你在看我
  NoticeU,
  // 向你挥手
  Waving,
}

const Time = {
  Writing: 3000, // 写字到注意到你的时间
  NoticeU: 1500, // 转场时间
  Waving: 1500, // 挥手的离别时间（在这段时间内回来都还在挥手）
}

const Footer: React.FC = () => {
  const [currStage, setCurrStage] = useState<Stage>(Stage.Writing)

  const handRef = useRef<HTMLDivElement>(null)
  const timerNotice = useRef<any>()
  const timerWaving = useRef<any>()
  const timerWriting = useRef<any>()

  const [inViewport] = useInViewport(handRef)

  useEffect(() => {
    if (inViewport) {
      // 进入视野
      clearTimeout(timerWriting.current)
      // 开始注意到
      timerNotice.current = setTimeout(() => {
        currStage === Stage.Writing && setCurrStage(Stage.NoticeU)
      }, Time.Writing)

      // 开始挥手
      timerWaving.current = setTimeout(() => {
        setCurrStage(Stage.Waving)
      }, Time.Writing + Time.NoticeU)
    } else {
      timerWriting.current = setTimeout(() => {
        setCurrStage(Stage.Writing)
        clearTimeout(timerNotice.current)
        clearTimeout(timerWaving.current)
      }, Time.Waving)
    }
  }, [inViewport])

  const cls = classnames(styles.hiFromBigno, 'relative', {
    'iam-writing': currStage === Stage.Writing,
    'notice-u': currStage === Stage.NoticeU,
    'waving-to-u': currStage === Stage.Waving,
  })

  return (
    <footer className="border-t border-accent-2 bg-stone-100 dark:border-[#404040] dark:bg-midnight-200">
      <div className="container mx-auto flex flex-col items-center md:pt-10 md:pb-20 pb-8">
        <div style={{ fontFamily: "'Fira Code', monospace"}} className="font-bold text-center">
          <h3 className="mb-5 mt-10 w-full text-2xl leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:text-6xl">
            Hi there, it's Bigno.
          </h3>
        </div>

        <div className={cls} ref={handRef}>
          <div className="surprised">❗️</div>
          <div className="writing">✍</div>
          <div className="greeting">👋</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
