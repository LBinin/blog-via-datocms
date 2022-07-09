import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from './index.module.scss'


import classnames from 'classnames'

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

  if (!code || !language) {
    return null
  }

  // const highlightCode = Prism.highlight(code, Prism.languages[language], language)
  // console.log({ l: Prism.languages })

  let lineNumber = 1

  return (
    <div className={styles.codeBlock}>
      <SyntaxHighlighter
        language={language}
        showInlineLineNumbers={false}
        useInlineStyles={false}
        wrapLines={true}
        lineNumberContainerStyle={{ paddingRight: 20, float: 'left' }}
        wrapLongLines={wrapLongLine}
        lineProps={() => {
          const number = lineNumber++ // 不能用入参的，因为关了 showLineNumbers 就传过来 false 我吐了
          const cls = classnames('code-line', {
            'highlight-line': highlightLine?.includes(number - 1),
            'line-number': lineNumbers,
          })
          return {
            className: cls,
            class: cls,
            "data-line": number,
            style: { flexWrap: 'wrap' }
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeView
