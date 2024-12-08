import { AllPostQuery } from '@/const/query'
import Header from '@/components/post/Header'
import React from 'react'
import { request } from '@/lib/datocms'
import { useQuerySubscription } from 'react-datocms'
import { flatMap, groupBy, map, mapValues } from 'lodash'
import { PostInfo } from '@/typing/post'
import Underline from '@/components/base/Underline'
import PostCard from '@/components/post/PostCard'

const groupItemsByCategory = (items: PostInfo[], groupKey: string): Record<string, PostInfo[]> => {
  // 扁平化每个 item 的 categories
  const categorizedItems = flatMap(items, (item) =>
    map(item.category, (category) => ({
      category,
      item,
    }))
  );

  // 根据 category 分组
  const groupedByCategory = groupBy(categorizedItems, `category.${groupKey}`);

  console.log({ categorizedItems, groupedByCategory })

  // 提取每个组的 item 列表
  return mapValues(groupedByCategory, (group) =>
    map(group, 'item')
  );
};

export async function getStaticProps({ preview }: any) {
  const graphqlRequest = { query: AllPostQuery, preview }

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

  const groupPost = groupItemsByCategory(allPosts, 'name')

  const allTopicName = Object.keys(groupPost).sort()

  return (
    <div>
      <Header preview={subscription.preview} />

      {allTopicName.map((topicName) => {
        const topicPosts = groupPost[topicName]
        const topicCount = topicPosts.length

        return (
          <div className="mx-auto mb-24 max-w-3xl" key={topicName}>
            <div className="mt-10 md:mt-14 md:mb-16 flex items-center space-x-4 mx-8 md:mx-0">
              <p className="text-3xl md:text-5xl font-bold">
                <Underline>{topicName}</Underline>
              </p>
              <div className="px-3 md:py-0.5 font-bold text-lg md:text-2xl rounded-r-lg rounded-tl-lg bg-black dark:bg-zinc-50 text-zinc-50 dark:text-black">{topicCount}</div>
            </div>

            {topicPosts?.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )
      })}
    </div>
  )
}
