import React from 'react'
import Slugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { StructuredTextRenderContext } from '@/model'
import { Heading } from 'datocms-structured-text-utils/dist/types/types'

const slugs = new Slugger()

const Heading: React.FC<{
  ctx: StructuredTextRenderContext<Heading>;
}> = props => {
  const { ctx } = props

  slugs.reset()

  const value = toString(ctx.node, { includeImageAlt: false })
  const slug = slugs.slug(value)

  return React.createElement(
    `h${ctx.node.level}`,
    { id: slug },
    ctx.children
  )
}

export default Heading
