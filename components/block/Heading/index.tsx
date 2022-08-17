import React from 'react'
import Slugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { Heading } from 'datocms-structured-text-utils/dist/types/types'
import { StructuredTextRenderContext } from '@/typing/post'

const slugs = new Slugger()

const Heading: React.FC<{
  ctx: StructuredTextRenderContext<Heading>
}> = props => {
  const { ctx } = props

  slugs.reset()

  const value = toString(ctx.node, { includeImageAlt: false })
  const slug = slugs.slug(value)

  return React.createElement(
    `h${ctx.node.level}`,
    {},
    <span id={slug}>{ctx.children}</span>
  )
}

export default Heading
