import { Record } from 'datocms-structured-text-utils/dist/types/types'
import {
  CalloutBlockRecord,
  CodeBlockRecord,
  ImageBlockRecord,
  TableBlockRecord,
} from '@/typing/block'
import { MyBlock } from '@/const/block'

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
