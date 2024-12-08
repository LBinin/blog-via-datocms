export const AllPostAttr = `
{
  title
  slug
  excerpt
  date
  coverImage {
    responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1000 }) {
      ...responsiveImageFragment
    }
  }
  category {
    name
    slug
    id
  }
  author {
    name
    picture {
      responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100}) {
        ...responsiveImageFragment
      }
    }
  }
  wip
  isReprint
  referenceLink
}
`
