import Head from 'next/head'
import { renderMetaTags, useQuerySubscription } from 'react-datocms'
import { request } from '@/lib/datocms'
import PostCard from '@/components/post/PostCard'
import HeroPostCard from '@/components/post/HeroPostCard'
import Introduction from '@/components/home/Introduction'
import { PostInfo } from '@/typing/post'
import { HomePage } from '@/const/query'
import Header from '@/components/post/Header'
import React from 'react'

export async function getStaticProps({ preview }: any) {
  const graphqlRequest = { query: HomePage, preview }

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

export default function Index(props: any) {
  const { subscription } = props
  const {
    data: { allPosts, site, blog },
  } = useQuerySubscription(subscription)

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  const metaTags = blog.seo.concat(site.favicon)

  console.log({ props, allPosts, site, blog })

  return (
    <div className="min-h-screen">
      <Head>{renderMetaTags(metaTags)}</Head>

      <main>
        <Header />
        <div className="mx-auto mb-24 max-w-3xl">
          {/*<Intro />*/}
          <Introduction />

          {heroPost && <HeroPostCard post={heroPost} />}

          {morePosts?.map((post: PostInfo, index: number) => (
            <PostCard key={[post, index].join()} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}
