import React from 'react'
import { CodeSandboxBlockRecord } from '@/components/block/types'
import BlockSummary from '@/components/base/BlockSummary'

interface SandboxBlockProps {
  record?: CodeSandboxBlockRecord
}

const DEFAULT_IFRAME_HEIGHT = 350

const CodeSandboxBlock: React.FC<SandboxBlockProps> = props => {
  const { record } = props

  const height = record?.height ?? DEFAULT_IFRAME_HEIGHT

  return (
    <div>
      <div className="relative rounded overflow-hidden">
        <iframe
          src={record?.url}
          title="React Hooks Demo"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="w-full"
          height={height}
        />

      </div>
      <BlockSummary title={record?.title} />
    </div>
  )
}

export default CodeSandboxBlock
