import React from 'react'
import { AllPostGroupByCategory, TopicPostQuery } from '@/const/query'
import { request } from '@/lib/datocms'
import { useQuerySubscription } from 'react-datocms'
import PostCard from '@/components/post/PostCard'
import Header from '@/components/post/Header'
import Underline from '@/components/base/Underline'

export async function getStaticPaths() {
  const data = await request({
    query: `{ allCategories { slug } }`,
  })

  return {
    paths: data.allCategories.map((topic: any) => `/topics/${topic.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview }: any) {
  const topicRequest = {
    query: TopicPostQuery,
    variables: {
      topic: params.topic,
    },
    preview,
  }

  const topicResult = await request(topicRequest)

  const postRequest = {
    preview,
    query: AllPostGroupByCategory,
    variables: {
      topic: topicResult?.category?.id,
    },
  }
  const allPost = await request(postRequest)

  const data = {
    category: topicResult?.category,
    count: allPost?._allPostsMeta.count,
    posts: allPost?.allPosts,
  }

  return {
    props: {
      params,
      subscription: preview
        ? {
            // ...postRequest,
            initialData: data,
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: data,
          },
    },
  }
}

const Topic: React.FC = (props: any) => {
  const { subscription } = props

  const { data } = useQuerySubscription(subscription)

  return (
    <div>
      <Header />
      <div className="mx-auto mb-24 max-w-3xl">
        <div className="mt-10 md:mt-14 md:mb-16 flex items-center space-x-4 mx-8 md:mx-0">
          <p className="text-3xl md:text-5xl font-bold">
            <Underline>{data.category.name}</Underline>
          </p>
          <div className="px-3 md:py-0.5 font-bold text-lg md:text-2xl rounded-r-lg rounded-tl-lg bg-black dark:bg-zinc-50 text-zinc-50 dark:text-black">{data.count}</div>
        </div>

        {data?.posts?.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Topic
