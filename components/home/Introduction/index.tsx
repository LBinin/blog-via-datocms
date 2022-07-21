import React from 'react'

const Introduction: React.FC = () => {
  return (
    <div className="py-20">
      <h1 className="text-7xl font-bold tracking-tighter leading-tight">
        <span className="inline-block animate-[waving_2.5s_infinite] origin-[70%_70%] mr-8">👋</span>Bigno.
      </h1>

      <div className="mt-8 px-10 text-gray-400 leading-8 font-bold">
        <p>地球上另一个地方</p>
        <p>总有一群类似的人</p>
        <p>你们享受着相同的狂欢</p>
        <p>那就足够了</p>
      </div>
    </div>
  )
}

export default Introduction
