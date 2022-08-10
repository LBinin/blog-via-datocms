import Head from 'next/head'
import { renderMetaTags, useQuerySubscription } from 'react-datocms'
// import Container from '@/components/container'
// import Header from '@/components/header'
// import Layout from '@/components/layout'
// import MoreStories from '@/components/more-stories'
// import PostBody from '@/components/post-body'
// import PostHeader from '@/components/post-header'
import { request } from '@/lib/datocms'

import PostTitle from '@/components/post/PostTitle'
import PostContent from '@/components/post/PostContent'
import PostToc from '@/components/post/PostToc'
import PostLayout from '../../layout/post'
import PostTocDrawer from '@/components/post/PostTocDrawer'
import React, { useState } from 'react'
import {
  AllPostBlocks,
  metaTagsFragment,
  responsiveImageFragment,
} from '../../const/slug-query'

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` })

  return {
    paths: data.allPosts.map(post => `/posts/${post.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
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
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  }

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
      preview,
    },
  }
}

export default function Post({ subscription, preview }) {
  console.log({ subscription })
  const {
    data: { site, post, morePosts },
  } = useQuerySubscription(subscription)

  const metaTags = post.seo.concat(site.favicon)

  const [menuVisible, setMenuVisible] = useState(false)

  console.log({ post, preview })

  return (
    <PostLayout preview={preview} onMenuOpen={() => setMenuVisible(i => !i)}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <div className="mx-auto mt-8 mb-24 max-w-3xl md:mt-14">
        <PostTitle
          title={post.title}
          author={post.author}
          date={post.date}
          coverImage={post.coverImage?.responsiveImage}
          wip={post.wip}
        />

        <article className="relative">
          {/*<PostHeader*/}
          {/*  title={post.title}*/}
          {/*  coverImage={post.coverImage}*/}
          {/*  date={post.date}*/}
          {/*  author={post.author}*/}
          {/*/>*/}

          <PostContent dataSource={post.content} theme={post.theme?.hex} />
          {/*<PostBody content={post.content} />*/}
          <PostToc dataSource={post.content?.value?.document?.children} />

          <PostTocDrawer
            dataSource={post.content?.value?.document?.children}
            visible={menuVisible}
            onClose={() => setMenuVisible(false)}
          />
        </article>

        {/*<hr className="border-accent-2 dark:border-[#404040] mt-28 mb-24" />*/}
        {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
      </div>
    </PostLayout>
  )
}
