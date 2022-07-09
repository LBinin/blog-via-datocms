import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import MoreStories from "@/components/more-stories";
import PostBody from "@/components/post-body";
import PostHeader from "@/components/post-header";
import { request } from "@/lib/datocms";

import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import PostTitle from '@/components/post/PostTitle'
import PostContent from '@/components/post/PostContent'
import PostToc from '@/components/post/PostToc'
import PostLayout from '../../layout/post'

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` });

  return {
    paths: data.allPosts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
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
            blocks {
              __typename
              ...on ImageBlockRecord {
                id
                image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop }) {
                    ...responsiveImageFragment
                  }
                }
              }
              ... on CodeBlockRecord {
                id
                caption
                multiTabCodeBlock {
                  blocks
                  links
                  value
                }
                showLineNumber
                wrapLongLines
                defaultActiveTab
              }
            }
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
  };

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
  };
}

export default function Post({ subscription, preview }) {
  console.log({ subscription })
  const {
    data: { site, post, morePosts },
  } = useQuerySubscription(subscription);

  const metaTags = post.seo.concat(site.favicon);

  console.log({ post, preview })

  return (
    <PostLayout preview={preview}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <div className="max-w-3xl mx-auto mt-8 md:mt-14 mb-24">
        <PostTitle
          title={post.title}
          author={post.author}
          date={post.date}
          coverImage={post.coverImage?.responsiveImage}
        />

        <article className="relative">
          {/*<PostHeader*/}
          {/*  title={post.title}*/}
          {/*  coverImage={post.coverImage}*/}
          {/*  date={post.date}*/}
          {/*  author={post.author}*/}
          {/*/>*/}

          <PostContent dataSource={post.content} theme={post.theme?.hex}/>
          {/*<PostBody content={post.content} />*/}
          <PostToc dataSource={post.content?.value?.document?.children}/>
        </article>

        {/*<hr className="border-accent-2 dark:border-[#404040] mt-28 mb-24" />*/}
        {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
      </div>
    </PostLayout>
  );
}
