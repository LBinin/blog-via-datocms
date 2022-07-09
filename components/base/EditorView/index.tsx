/**
 * 模拟编辑器风格展示代码块
 */
import React, { useContext, useEffect, useState } from 'react'
import classnames from 'classnames'
import { ThemeContext } from '@/context/theme'
import CodeView from '@/components/base/CodeView'
import { Code } from 'datocms-structured-text-utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export interface CodeViewBlock {
  codeNode: Code,
  caption?: string,
}

// 优化体验
const LanguageDisplayMapping: any = {
  'html': 'HTML',
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'css': 'CSS',
  'scss': 'Scss',
  'sass': 'Sass',
  'bash': 'Bash',
  'json': 'JSON',
  'plain': 'Plain',
}

const EditorView: React.FC<{
  dataSource?: CodeViewBlock | CodeViewBlock[];
  lineNumber?: boolean;
  simpleMode?: boolean;
  wrapLongLine?: boolean;
  defaultActiveTab?: number;
}> = props => {
  const { dataSource, simpleMode, lineNumber, wrapLongLine, defaultActiveTab } = props

  const codeBlockList = Array.isArray(dataSource) ? dataSource : dataSource ? [dataSource] : []

  console.log({ defaultActiveTab, codeBlockList })
  const [currTab, setCurrTab] = useState((defaultActiveTab && defaultActiveTab <= codeBlockList.length) ? defaultActiveTab - 1 : 0)
  const [codeWrap, setCodeWrap] = useState(wrapLongLine)
  const [codeCopied, setCodeCopied] = useState(false)
  const { theme } = useContext(ThemeContext)

  if (!dataSource) {
    return null
  }

  useEffect(() => {
    let timer: any
    if (codeCopied) {
      timer = setTimeout(() => setCodeCopied(false), 1500)
    }

    return () => {
      timer && clearTimeout(timer)
      console.log('clear')
    }
  }, [codeCopied])

  const handleCopyCode = () => {
    setCodeCopied(true)
  }

  const handleToggleWrap = () => {
    setCodeWrap(w => !w)
  }

  const isDarkTheme = theme === 'dark'

  const EditorClass = {
    Border: isDarkTheme ? 'border-[#181819]' : 'border-gray-200',
    BorderLight: isDarkTheme ? 'border-[#3c3c3d]' : 'border-gray-200',
    Text: isDarkTheme ? 'text-[#78787a]' : 'text-gray-400',
    TextActive: isDarkTheme ? 'text-white' : 'text-gray-800',
    TabBg: isDarkTheme ? 'bg-[#3c3c3d]/50' : 'bg-gray-50',
    TabActiveBg: isDarkTheme ? 'bg-[#1c1c1c]' : 'bg-white',
  }

  const currCodeNode = (currTab ? codeBlockList[currTab] : codeBlockList[0])?.codeNode
  const currLanguage = currCodeNode.language?.toLowerCase()

  // 功能性操作
  const functionalOperation = (
    <>
      <div className="px-3 my-auto text-xs bg-gray-50 py-1 rounded mr-2">
        {currLanguage && LanguageDisplayMapping[currLanguage]}
      </div>

      <button onClick={handleToggleWrap} className="mr-2 my-auto">
        <svg className={classnames('p-1 bg-white/0 rounded box-content w-4 h-4 text-white transition-colors duration-300', { 'bg-gray-200': codeWrap })} fill={isDarkTheme ? '#78787a' : '#9ca3af'} viewBox="0 0 1024 1024" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M640 768h64a106.666667 106.666667 0 1 0 0-213.333333H170.666667a42.666667 42.666667 0 0 1 0-85.333334h533.333333a192 192 0 1 1 0 384H640v42.666667a21.333333 21.333333 0 0 1-34.133333 17.066667l-91.008-68.266667a42.666667 42.666667 0 0 1 0-68.266667l91.008-68.266666a21.333333 21.333333 0 0 1 34.133333 17.066666v42.666667zM170.666667 170.666667h682.666666a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 1 1 0-85.333333z m213.333333 640a42.666667 42.666667 0 0 1-42.666667 42.666666H170.666667a42.666667 42.666667 0 0 1 0-85.333333h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667z" />
        </svg>
      </button>


      <CopyToClipboard text={currCodeNode.code} onCopy={handleCopyCode}>
        <button onClick={handleCopyCode} className="my-auto">
          {codeCopied
            // 复制图标
            ? <svg className="p-1 box-content w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            // 复制成功
            : <svg className="p-1 box-content w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          }
        </button>
      </CopyToClipboard>
    </>
  )

  return (
    <div className={`${EditorClass.TabActiveBg} rounded-lg border ${EditorClass.Border} overflow-hidden relative group`}>
      {/* 标题区域 */}
      {!simpleMode && (
        <div className={`mt-2 flex ${EditorClass.Text} border-b ${EditorClass.Border}`}>
          {codeBlockList.map((item, index) => (
            <button
              key={index}
              tabIndex={0}
              onClick={() => setCurrTab(index)}
              className={classnames(
                `px-5 py-2 border-t ${EditorClass.BorderLight} text-sm cursor-pointer`,
                // 未激活样式
                { [`${EditorClass.TabBg} border-r`]: index !== currTab },
                // 激活时的样式
                { [`${EditorClass.TabActiveBg} ${EditorClass.TextActive} border-b-2 border-b-sky-500 border-t-transparent`]: index === currTab },
                // 处理两旁圆角
                { [`rounded-tr`]: index === currTab - 1 },
                { [`rounded-tl border-l`]: index === currTab + 1 },
              )}
            >
              {item.caption}
            </button>
          ))}

          {/* 右侧功能区 */}
          <div className={classnames(`${EditorClass.TabBg} border-t ${EditorClass.BorderLight} flex-1 flex justify-end pr-3`, { 'rounded-tl border-l': currTab === codeBlockList.length - 1 })}>
            {functionalOperation}
          </div>
        </div>
      )}

      {simpleMode && (
        <div className={`absolute right-2 top-2 flex transition opacity-0 group-hover:opacity-100 ${EditorClass.Text}`}>
          {functionalOperation}
        </div>
      )}

      {/* 代码块区域 */}
      <CodeView
        key={codeBlockList[currTab].caption}
        language={currLanguage}
        code={currCodeNode.code}
        lineNumbers={lineNumber}
        highlightLine={currCodeNode.highlight}
        wrapLongLine={codeWrap}
      />
    </div>
  )
}

export default EditorView
