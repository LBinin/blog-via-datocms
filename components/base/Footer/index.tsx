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
  NoticeU: 2000, // 转场时间
  Waving: 1000, // 挥手的离别时间（在这段时间内回来都还在挥手）
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
        console.log('clear timerWriting')
        setCurrStage(Stage.Writing)
        clearTimeout(timerNotice.current)
        clearTimeout(timerWaving.current)
      }, Time.Waving)
    }
  }, [inViewport])

  console.log({ currStage })

  const cls = classnames(styles.hiFromBigno, 'relative', {
    'iam-writing': currStage === Stage.Writing,
    'notice-u': currStage === Stage.NoticeU,
    'waving-to-u': currStage === Stage.Waving,
  })

  return (
    <footer className="border-t border-accent-2 dark:border-[#404040]">
      <div className="container mx-auto pt-10 pb-20 flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl lg:text-6xl font-['Fira_Code'] font-bold tracking-tighter leading-tight text-center mb-10 mt-10 w-full">
          Hello From Bigno.
        </h3>


        <div className={cls} ref={handRef}>
          <div className="surprised">
            ❗️
          </div>
          <div className="writing">✍</div>
          <div className="greeting">👋</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
