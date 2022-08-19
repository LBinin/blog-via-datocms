import { getNodeValue } from '@/util'
import React, { useMemo } from 'react'
import { CodeBlockRecord } from '@/typing/block'
import { isCode, isHeading } from 'datocms-structured-text-utils'
import EditorView, { CodeViewBlock } from '@/components/base/EditorView'
import { Code } from 'datocms-structured-text-utils/dist/types/types'
import { StructuredTextRenderContext } from '@/typing'

const CodeBlock: React.FC<{
  record: CodeBlockRecord | StructuredTextRenderContext<Code>
}> = props => {
  const { record } = props

  // 只有自定义模块会使用高级模式，其他（普通代码块）均为 Simple 模式
  // const isSimpleMode = '__typename' in record && record.__typename !== 'CodeBlockRecord'
  const isSimpleMode = !('__typename' in record)

  console.log({ isSimpleMode, record })

  // 获取所有 CodeBlock 及其 Caption
  const codeBlockList = useMemo(() => {
    if (!('__typename' in record)) {
      return [
        {
          codeNode: record.node,
        },
      ] as CodeViewBlock[]
    }

    const nodeList = record?.multiTabCodeBlock?.value?.document?.children

    if (!nodeList?.length) {
      return []
    }

    const result: CodeViewBlock[] = []
    let untitledIndex = 1
    let lastCodeBlockIndex = 0

    nodeList.forEach((node, index) => {
      if (isCode(node)) {
        // 往前找 title
        const heading = nodeList
          .slice(lastCodeBlockIndex, index)
          .reverse()
          .find(isHeading)
        result.push({
          codeNode: node,
          caption: getNodeValue(heading, false) || `未命名-${untitledIndex++}`,
        })
        lastCodeBlockIndex = index
      }
    })

    return result
  }, [record])

  if (codeBlockList.length === 0) {
    return null
  }

  return (
    <div className="my-5">
      <EditorView
        dataSource={codeBlockList}
        simpleMode={isSimpleMode}
        lineNumber={!isSimpleMode && record?.showLineNumber}
        wrapLongLine={!isSimpleMode && record?.wrapLongLines}
        defaultActiveTab={!isSimpleMode ? record?.defaultActiveTab : undefined}
      />

      {!isSimpleMode && record?.caption && (
        <div className="py-4 text-center text-sm opacity-60">
          {record.caption}
        </div>
      )}
    </div>
  )
}

export default CodeBlock
