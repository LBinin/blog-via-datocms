import Head from 'next/head'
import { renderMetaTags, useQuerySubscription } from 'react-datocms'
import { request } from '@/lib/datocms'
import PostHeader from '@/components/post/PostHeader'
import PostContent from '@/components/post/PostContent'
import PostToc from '@/components/post/PostToc'
import PostLayout from '../../layout/post'
import PostTocDrawer from '@/components/post/PostTocDrawer'
import React, { useState } from 'react'
import { PostContext } from '@/context/post'
import { PostInfo } from '@/typing/post'
import { SinglePostQuery } from '@/const/query'
import Header from '@/components/post/Header'

export async function getStaticPaths() {
  const data = await request({
    query: `{ allPosts { slug } }`,
  })

  return {
    paths: data.allPosts.map((post: any) => `/posts/${post.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }: any) {
  const graphqlRequest = {
    preview,
    query: SinglePostQuery,
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

export default function Post({ subscription, preview }: any) {
  const { data: { site, post, morePosts } = {} } = useQuerySubscription<{
    site: any
    post: PostInfo
    morePosts: any
  }>(subscription)

  const metaTags = post?.seo?.concat(site.favicon)

  const [menuVisible, setMenuVisible] = useState(false)

  // console.log({ post, preview })

  return (
    <PostContext.Provider value={post ?? {}}>
      <Header preview={preview} />

      <PostLayout preview={preview} onMenuOpen={() => setMenuVisible(i => !i)}>
        {metaTags && <Head>{renderMetaTags(metaTags)}</Head>}

        <div className="mx-auto mb-24 max-w-3xl md:mt-14">
          <PostHeader />

          <article className="relative">
            <PostContent theme={post?.theme?.hex} />
            {/*<PostBody content={post.content} />*/}
            <PostToc dataSource={post?.content?.value?.document?.children} />

            <PostTocDrawer
              dataSource={post?.content?.value?.document?.children}
              visible={menuVisible}
              onClose={() => setMenuVisible(false)}
            />
          </article>
          {/*<hr className="border-accent-2 dark:border-[#404040] mt-28 mb-24" />*/}
          {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
        </div>
      </PostLayout>
    </PostContext.Provider>
  )
}
