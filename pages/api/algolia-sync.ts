import { request } from '@/lib/datocms'
import algoliasearch from 'algoliasearch/lite'
import { NextApiRequest, NextApiResponse } from 'next'

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
      console.log({ USER: process.env.API_AUTH_USERNAME, RESULT: username === process.env.API_AUTH_USERNAME })
      console.log({ PASS: process.env.API_AUTH_PASSWORD, RESULT: password === process.env.API_AUTH_PASSWORD })
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
    const index = algoliaClient.initIndex('blog_via_datocms')
    const pageSize = 20

    // retrieving all posts from the headless CMS
    const allPostsGraphqlRequest = (first: number, skip: number) => {
      return {
        query: `
      {
        allPosts(orderBy: date_DESC, first: ${first}, skip: ${skip}) {
          id
          title
          slug
          excerpt
          date
        }
       meta: _allPostsMeta {
          count
       }
      }
    `,
      }
    }
    const postResponse = await request(allPostsGraphqlRequest(pageSize, 0))

    // the number of all posts available
    const postCount = postResponse.meta.count
    // iterating over the posts because the allPosts query is paginated
    // by default
    for (let page = 0; page < Math.ceil(postCount / pageSize); page++) {
      const posts = await request(
        allPostsGraphqlRequest(pageSize, page * pageSize)
      )
      // converting tha data retrieved by the headless CMS
      // into the desired Algolia format
      const algoliaPosts = posts.allPosts.map((post: any) => {
        return {
          objectID: post.id,
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          date: post.date,
        }
      })
      // saving the post info to Algolia

      // @ts-ignore
      await index?.saveObjects(algoliaPosts)
    }

    res.json(`Content successfully synchronized with Algolia search`)
    res.end()
  }
}
