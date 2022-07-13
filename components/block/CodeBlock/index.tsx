import React, { useMemo } from 'react'
import { isCode, isHeading } from 'datocms-structured-text-utils'
import { Node } from 'datocms-structured-text-utils/dist/types/types'
import { getNodeValue } from '@/util'
import EditorView, { CodeViewBlock } from '@/components/base/EditorView'

const CodeBlock: React.FC<{
  record?: any;
}> = props => {
  const { record } = props

  // 只有自定义模块会使用高级模式，其他（普通代码块）均为 Simple 模式
  const isSimpleMode = record.__typename !== "CodeBlockRecord"

  // 获取所有 CodeBlock 及其 Caption
  const codeBlockList = useMemo(() => {
    if (isSimpleMode) {
      return [{
        codeNode: record.node,
      }]
    }

    const nodeList: Node[] = record?.multiTabCodeBlock?.value?.document?.children

    if (!nodeList?.length) {
      return []
    }

    const result: CodeViewBlock[] = []
    let untitledIndex = 1
    let lastCodeBlockIndex = 0

    nodeList.forEach((node, index) => {
      if (isCode(node)) {
        // 往前找 title
        const heading = nodeList.slice(lastCodeBlockIndex, index).reverse().find(isHeading)
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

  // const isMultiTab = codeBlockList.length > 1

  return (
    <div className="my-5">
      <EditorView
        dataSource={codeBlockList}
        simpleMode={isSimpleMode}
        lineNumber={!isSimpleMode && record?.showLineNumber}
        wrapLongLine={record?.wrapLongLines}
        defaultActiveTab={record?.defaultActiveTab}
      />

      {record?.caption && <div className="text-sm text-center py-4 opacity-60">{record.caption}</div>}
    </div>
  )
}

export default CodeBlock
