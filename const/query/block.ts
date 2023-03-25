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
    title
    content {
      value
    }
    color {
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
