import { request } from '@/lib/datocms'
import { ALGOLIA_INDEX_NAME } from '@/const'
import algoliasearch from 'algoliasearch/lite'
import { AlgoliaSyncQuery } from '@/const/query'
import { NextApiRequest, NextApiResponse } from 'next'
import { extractContentFromStructuredText } from '@/util/crawler'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // initializing the Algolia client with the secret keys
  if (req.method === 'POST') {
    // Auth
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.json('Authentication failed!')
      res.end()
      return
    }

    const [username, password] = Buffer.from(
      authHeader!.replace('Basic ', ''),
      'base64'
    )
      .toString()
      .split(':')

    console.log({ authHeader, username, password })

    if (
      username !== process.env.API_AUTH_USERNAME ||
      password !== process.env.API_AUTH_PASSWORD
    ) {
      res.json('Authentication failed!')
      res.end()
      return
    }

    // Process a POST request
    const algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
      process.env.ALGOLIA_ADMIN_KEY!
    )

    // setting the Algolia index related to your blog
    const index = algoliaClient.initIndex(ALGOLIA_INDEX_NAME)
    const pageSize = 20

    // retrieving all posts from the headless CMS
    const allPostsGraphqlRequest = (first: number, skip: number) => ({
      query: AlgoliaSyncQuery(first, skip),
    })

    // const postResponse = await request(allPostsGraphqlRequest(pageSize, 0))
    const postResponse = await request(allPostsGraphqlRequest(pageSize, 0))

    // the number of all posts available
    const postCount = postResponse.meta.count
    const algoliaPostsRecords = []

    // iterating over the posts because the allPosts query is paginated
    // by default
    for (let page = 0; page < Math.ceil(postCount / pageSize); page++) {
      const posts = await request(
        allPostsGraphqlRequest(pageSize, page * pageSize)
      )
      // converting tha data retrieved by the headless CMS
      // into the desired Algolia format

      const algoliaPosts = posts.allPosts
        .map((post: any) => extractContentFromStructuredText(post))
        .flat()
      algoliaPostsRecords.push(...algoliaPosts)

      // @ts-ignore
      // await index?.saveObjects(algoliaPosts)
    }

    // saving the post info to Algolia
    // @ts-ignore
    await index.replaceAllObjects(algoliaPostsRecords) // 从索引中清除所有对象，并用一组新对象替换它们。 https://www.algolia.com/doc/api-reference/api-methods/replace-all-objects/

    res.json(`Content successfully synchronized with Algolia search`)
    res.end()
  }
}
