import { Record } from 'datocms-structured-text-utils/dist/types/types'
import {
  CalloutBlockRecord,
  CodeBlockRecord,
  ImageBlockRecord,
  TableBlockRecord,
} from '@/components/block/types'

import { MyBlock } from '@/components/block/const'

export function isCodeBlock(record: Record): record is CodeBlockRecord {
  return record.__typename === MyBlock.Code
}

export function isCalloutBlock(record: Record): record is CalloutBlockRecord {
  return record.__typename === MyBlock.Callout
}

export function isImageBlock(record: Record): record is ImageBlockRecord {
  return record.__typename === MyBlock.Image
}

export function isTableBlock(record: Record): record is TableBlockRecord {
  return record.__typename === MyBlock.Table
}

export function isCodeSandboxBlock(record: Record): record is TableBlockRecord {
  return record.__typename === MyBlock.CodeSandboxBlock
}
