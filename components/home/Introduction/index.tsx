import React from 'react'

const Introduction: React.FC = () => {
  return (
    <div className="pt-12 md:pt-20 pb-10 px-6 md:px-0">
      <h1 className="text-[3.8em] md:text-7xl font-bold tracking-tighter leading-tight">
        Bigno.
        <span className="inline-block animate-[waving_2.5s_infinite] origin-[70%_70%] ml-8 select-none">👋</span>
      </h1>

      <div className="mt-8 md:mt-10 text-gray-600 leading-8 font-bold">
        <p>始终相信地球上另一个地方，</p>
        <p>总有一群类似的人，</p>
        <p>你们享受着相同的狂欢。</p>
      </div>
    </div>
  )
}

export default Introduction
