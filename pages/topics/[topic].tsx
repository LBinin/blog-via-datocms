import React from 'react'
import { useRouter } from 'next/router'
import { AllPostGroupByCategory, TopicPostQuery } from '@/const/query'
import { request } from '@/lib/datocms'
import { useQuerySubscription } from 'react-datocms'

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
    preview
  }

  const topicResult = await request(topicRequest)

  console.log({ topicResult })

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
    posts: allPost?.allPosts
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

  const router = useRouter()

  const {
    data,
  } = useQuerySubscription(subscription)
  const { topic } = router.query
  console.log({ data, props })
  return <div>Topic {topic}</div>
}

export default Topic
