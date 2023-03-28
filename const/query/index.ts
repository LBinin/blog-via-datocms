import {
  metaTagsFragment,
  responsiveImageFragment,
} from '@/const/query/fragment'
import { AllPostBlocks } from '@/const/query/block'

export const HomePage = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    blog {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    allPosts(orderBy: date_DESC, first: 20) {
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
    }
  }

  ${metaTagsFragment}
  ${responsiveImageFragment}
`

export const TopicsPage = ``

export const AlgoliaSyncQuery = (first: number, skip: number) => `
  {
    allPosts(orderBy: date_DESC, first: ${first}, skip: ${skip}) {
      id
      title
      content {
        value
        ${AllPostBlocks}
      }
      slug
      excerpt
      date
    }
   meta: _allPostsMeta {
      count
   }
  }
  
  ${responsiveImageFragment}
`
