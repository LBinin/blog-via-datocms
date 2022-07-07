import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-accent-2 dark:border-[#404040]">
      <div className="container mx-auto py-28 flex flex-col lg:flex-row items-center">
        <h3
          className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          Hello From Bigno.
        </h3>
      </div>
    </footer>
  )
}

export default Footer
