import { useEffect, useState } from 'react'

/**
 * 为了绕过 Next.js 拿到 Document
 */
const useDocument = () => {
  const [target, setTarget] = useState<Document>()

  useEffect(() => {
    // 绕过 next 静态生成
    setTarget(document)
  }, [])

  return target
}

export default useDocument
