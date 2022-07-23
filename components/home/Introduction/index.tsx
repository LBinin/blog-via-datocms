import React from 'react'

const Introduction: React.FC = () => {
  return (
    <div className="px-6 pt-12 pb-10 md:px-0 md:pt-20">
      <h1 className="text-[3.8em] font-bold leading-tight tracking-tighter md:text-7xl">
        Bigno.
        <span className="ml-8 inline-block origin-[70%_70%] animate-[waving_2.5s_infinite] select-none">
          👋
        </span>
      </h1>

      <div className="mt-8 font-bold leading-8 text-gray-600 dark:text-white/80 md:mt-10">
        <p>始终相信地球上另一个地方，</p>
        <p>总有一群类似的人，</p>
        <p>你们享受着相同的狂欢。</p>
      </div>
    </div>
  )
}

export default Introduction
