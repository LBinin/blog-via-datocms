import {
  metaTagsFragment,
  responsiveImageFragment,
} from '@/const/query/fragment'
import { AllPostAttr } from '@/const/query/attribute'
import { AllPostBlocks } from '@/components/block/const'

export const AllPostQuery = `
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
    allPosts(orderBy: date_DESC, first: 20) ${AllPostAttr}
  }

  ${metaTagsFragment}
  ${responsiveImageFragment}
`

// @params - slug: post slug
export const SinglePostQuery = `
query PostBySlug($slug: String) {
  site: _site {
    favicon: faviconMetaTags {
      ...metaTagsFragment
    }
  }
  post(filter: {slug: {eq: $slug}}) {
    seo: _seoMetaTags {
      ...metaTagsFragment
    }
    title
    slug
    content {
      value
      ${AllPostBlocks}
    }
    date
    ogImage: coverImage{
      url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
    }
    coverImage {
      responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1100 }) {
        ...responsiveImageFragment
      }
    }
    theme {
      hex
      alpha
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

  morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
    title
    slug
    excerpt
    date
    coverImage {
      responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
        ...responsiveImageFragment
      }
    }
    author {
      name
      picture {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
          ...responsiveImageFragment
        }
      }
    }
  }
}

${responsiveImageFragment}
${metaTagsFragment}
`

export const AllTopicsQuery = `
query AllTopics {
  allCategories {
    name
    slug
  }
}
`

// @params - topic: topic slug
export const TopicPostQuery = `
query TopicCountBySlug($topic: String) {
  category(filter: {slug: {eq: $topic}}) {
    slug
    id
    name
  }
}
`

export const AllPostGroupByCategory = `
query AllPostUnderTopic($topic: [ItemId]) {
  _allPostsMeta(filter: {category: {anyIn: $topic}}) {
    count
  }
  allPosts(filter: {category: {anyIn: $topic}}) ${AllPostAttr}
}
${responsiveImageFragment}
`

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
