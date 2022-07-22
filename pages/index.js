import Head from 'next/head'
import { renderMetaTags, useQuerySubscription } from 'react-datocms'
import Container from '@/components/container'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import MoreStories from '@/components/more-stories'
import { request } from '@/lib/datocms'
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments'
import PostCard from '@/components/post/PostCard'
import HeroPostCard from '@/components/post/HeroPostCard'
import Introduction from '@/components/home/Introduction'

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
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
        }
      }

      ${metaTagsFragment}
      ${responsiveImageFragment}
    `,
    preview,
  }

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  }
}

export default function Index({ subscription }) {
  const {
    data: { allPosts, site, blog },
  } = useQuerySubscription(subscription)

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  console.log({ morePosts })
  const metaTags = blog.seo.concat(site.favicon)

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(metaTags)}</Head>
        <div className="mx-auto mb-24 max-w-3xl">
          {/*<Intro />*/}
          <Introduction />

          {heroPost && <HeroPostCard post={heroPost} />}
          {/*{heroPost && (*/}
          {/*  <HeroPost*/}
          {/*    title={heroPost.title}*/}
          {/*    coverImage={heroPost.coverImage}*/}
          {/*    date={heroPost.date}*/}
          {/*    author={heroPost.author}*/}
          {/*    slug={heroPost.slug}*/}
          {/*    excerpt={heroPost.excerpt}*/}
          {/*  />*/}
          {/*)}*/}
          {morePosts?.map((post, index) => (
            <PostCard key={[post, index].join()} post={post} />
          ))}
          {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
        </div>
      </Layout>
    </>
  )
}
