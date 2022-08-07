// Block
export const ImageBlock = `
  ...on ImageBlockRecord {
    id
    image {
      responsiveImage(imgixParams: {fm: jpg, fit: crop }) {
        ...responsiveImageFragment
      }
    }
  }
`

export const CodeBlock = `
  ... on CodeBlockRecord {
    id
    caption
    multiTabCodeBlock {
      blocks
      links
      value
    }
    showLineNumber
    wrapLongLines
    defaultActiveTab
  }
`

export const CalloutBlock = `
  ... on CalloutBlockRecord {
    id
    emojiIcon
    calloutTitle
    calloutContent {
      value
    }
    calloutColor {
      hex
    }
  }
`

export const TableBlocks = `
  ... on TableBlockRecord {
    id
    content
  }
`

export const AllPostBlocks = `
  blocks {
    __typename
    ${ImageBlock}
    ${CodeBlock}
    ${CalloutBlock}
    ${TableBlocks}
  }
`

// GraphQL Fragment
// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`
export const metaTagsFragment = `
  fragment metaTagsFragment on Tag {
    attributes
    content
    tag
  }
`
