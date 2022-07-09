/**
 * 模拟编辑器风格展示代码块
 */
import React, { useState } from 'react'
import { Code } from 'datocms-structured-text-utils'
import CodeView from '@/components/base/CodeView'
import classnames from 'classnames'

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

const Color = {
  border: '#181819',
  borderLight: '#3c3c3d',
  text: '#2a2a2a'
}

const EditorView: React.FC<{
  dataSource?: CodeViewBlock | CodeViewBlock[];
  lineNumber?: boolean;
  simpleMode?: boolean;
}> = props => {
  const { dataSource, simpleMode, lineNumber } = props

  const [currTab, setCurrTab] = useState(0)

  if (!dataSource) {
    return null
  }

  const codeBlockList = Array.isArray(dataSource) ? dataSource : [dataSource]

  const handleCopyCode = () => {

  }

  const activeBg = 'bg-[#1c1c1c]'
  const idleBg = 'bg-[#3c3c3d]/50'

  const currCodeNode = codeBlockList[currTab].codeNode
  const currLanguage = currCodeNode.language?.toLowerCase()

  return (
    <div className={`${activeBg} rounded-lg border border-[${Color.border}] overflow-hidden relative`}>
      {/* 标题区域 */}
      {!simpleMode && (
        <div className={`mt-2 flex text-[${Color.text}] border-b border-[${Color.border}]`}>
          {codeBlockList.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrTab(index)}
              className={classnames(
                `px-5 py-2 border-t border-[${Color.borderLight}] text-sm cursor-pointer`,
                // 未激活样式
                { [`${idleBg} border-r`]: index !== currTab },
                // 激活时的样式
                { [`${activeBg} text-white border-b-2 border-b-sky-500 border-t-transparent`]: index === currTab },
                // 处理两旁圆角
                { [`rounded-tr`]: index === currTab - 1 },
                { [`rounded-tl border-l`]: index === currTab + 1 },
              )}
            >
              {item.caption}
            </div>
          ))}
          <div className={classnames(`${idleBg} border-t border-[${Color.borderLight}] flex-1 flex justify-end pr-3`, { 'rounded-tl': currTab === codeBlockList.length - 1 })}>
            <div className="px-3 my-auto text-xs">
              {currLanguage && LanguageDisplayMapping[currLanguage]}
            </div>

            <button>
              <svg className="p-1 bg-white/0 mr-2 rounded box-content w-4 h-4 text-white" fill="#fff" viewBox="0 0 1024 1024" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M640 768h64a106.666667 106.666667 0 1 0 0-213.333333H170.666667a42.666667 42.666667 0 0 1 0-85.333334h533.333333a192 192 0 1 1 0 384H640v42.666667a21.333333 21.333333 0 0 1-34.133333 17.066667l-91.008-68.266667a42.666667 42.666667 0 0 1 0-68.266667l91.008-68.266666a21.333333 21.333333 0 0 1 34.133333 17.066666v42.666667zM170.666667 170.666667h682.666666a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 1 1 0-85.333333z m213.333333 640a42.666667 42.666667 0 0 1-42.666667 42.666666H170.666667a42.666667 42.666667 0 0 1 0-85.333333h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667z" />
              </svg>
            </button>

            <button onClick={handleCopyCode}>
              <svg className="p-1 box-content w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* 代码块区域 */}
      <CodeView
        key={codeBlockList[currTab].caption}
        language={currLanguage}
        code={currCodeNode.code}
        lineNumbers={lineNumber}
        highlightLine={currCodeNode.highlight}
      />
    </div>
  )
}

export default EditorView
