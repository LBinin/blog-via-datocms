import React from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

import prismJSX from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import prismTSX from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import prismTypeScript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import prismJavaScript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import prismJson from 'react-syntax-highlighter/dist/cjs/languages/prism/json'

const CodeView: React.FC<{
  language?: string;
  code?: string;
  // 是否展示行号
  lineNumbers?: boolean;
  // 是否自动换行？
  wrapLongLine?: boolean;
  highlightLine?: number[];
}> = props => {
  const { code, language, lineNumbers, wrapLongLine, highlightLine } = props

  SyntaxHighlighter.registerLanguage('jsx', prismJSX)
  SyntaxHighlighter.registerLanguage('tsx', prismTSX)
  SyntaxHighlighter.registerLanguage('javascript', prismJavaScript)
  SyntaxHighlighter.registerLanguage('typescript', prismTypeScript)
  SyntaxHighlighter.registerLanguage('json', prismJson)

  if (!code || !language) {
    return null
  }

  let lineNumber = 1

  return (
    <div className={styles.codeBlock}>
      <SyntaxHighlighter
        language={language}
        showInlineLineNumbers={false}
        useInlineStyles={false}
        wrapLines={true}
        wrapLongLines={wrapLongLine}
        lineProps={() => {
          const number = lineNumber++ // 不能用入参的，因为关了 showLineNumbers 就传过来 false 我吐了
          const cls = classnames('code-line', {
            'highlight-line': highlightLine?.includes(number - 1),
            'line-number': lineNumbers,
          })

          // 下面代码由于存在右侧代码 https://github.com/react-syntax-highlighter/react-syntax-highlighter/blame/master/src/highlight.js#L108
          // 而且有 MR 也不合：https://github.com/react-syntax-highlighter/react-syntax-highlighter/pull/422/files
          // 所以不得不出此下策，阻止他改写我的 className，抱歉
          const property = {
            "data-line": number,
            style: { flexWrap: 'wrap' }
          }

          Object.defineProperty(property, 'className', {
            get() { return cls.split(' ') },
            set() {}
          })
          return property as any
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeView
