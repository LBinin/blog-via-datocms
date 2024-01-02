import React, { useContext, useEffect, useMemo, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import EditorView from '@/components/base/EditorView'
import ReactDOM from 'react-dom/server'
import { ThemeContext } from '@/context/theme'

/**
 * 解析如 html{1,2,3,4-10} 这样的字符串，返回语言和高亮行号
 * @param input 字符串
 */
function parseLangAndLines(input: string) {
  const matches = input.match(/([^{]*){([^}]*)}/) // 使用正则表达式匹配字符串和括号内的内容

  const numberSet = new Set()
  const numberMatches = matches?.[2].match(/\d+/g) // 获取括号内的内容，并使用正则表达式匹配所有数字或数字范围

  numberMatches?.forEach(match => {
    numberSet.add(parseInt(match, 10)) // 将匹配到的数字转换成整数，并添加到集合中
  })

  return {
    lang: matches?.[1].trim(), // 提取左括号前的字符串
    lines: Array.from(numberSet) as number[],
  }
}

const md = new MarkdownIt({
  typographer: true,
  quotes: '『』「」',
})

interface MarkdownRendererProps {
  className?: string
  style?: React.CSSProperties
  content: string
}

md.use(function (md) {
  // 自定义代码块渲染规则
  md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    const token = tokens[idx]
    const code = token.content
    const { lines, lang } = parseLangAndLines(token.info)

    // 在这里可以自定义渲染代码块的 HTML 结构并返回
    return ReactDOM.renderToStaticMarkup(
      <EditorView
        simpleMode={true}
        dataSource={{
          codeNode: { code, language: lang, type: 'code', highlight: lines },
        }}
        theme={env.theme}
      />
    )
  }

  md.renderer.rules.heading_open = function (tokens, idx, options, env, slf) {
    const token = tokens[idx];
    console.log({ token })
    if (token.nesting === 1) {
      // 开始标签
      return `<${token.tag}><span ${token.attrs?.map(i => i.join('=')).join(' ')}>`;
    } else {
      // 结束标签
      return `</span></${token.tag}>`;
    }
  }
}).use(MarkdownItAnchor, {
  level: [1, 2, 3, 4, 5, 6],
  slugify: function (s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, '-')
  }
})

const MarkdownRenderer: React.FC<MarkdownRendererProps> = props => {
  const { content } = props
  const { theme } = useContext(ThemeContext)
  const [html, setHtml] = useState('')

  // 不用 useMemo 的原因：在 SSR 时，在 useMemo 中使用 ReactDOM.renderToStaticMarkup 会报错
  // https://github.com/facebook/react/issues/16416
  useEffect(() => {
    setHtml(md.render(content, { theme }))
  }, [theme])

  return (
    <div
      className={props.className}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default MarkdownRenderer
