/**
 * Reference: https://www.datocms.com/blog/algolia-nextjs-how-to-add-algolia-instantsearch
 */
import '@docsearch/css';
import React from 'react'
import { ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME } from '@/const'
import { DocSearch } from '@docsearch/react';

const GlobalSearch: React.FC = props => {
  // return (
  //   <DocSearch
  //     appId="R2IYF7ETH7"
  //     apiKey="599cec31baffa4868cae4e79f180729b"
  //     indexName="docsearch"
  //     placeholder="搜索文章内容"
  //
  //   />
  // )
  return (
    <div id="blog-search">
      <DocSearch
        indexName={ALGOLIA_INDEX_NAME}
        appId={ALGOLIA_APP_ID}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!}
        placeholder="搜索文章内容"
        translations={{
          button: {
            buttonText: '搜索'
          },
          modal: {
            startScreen: {
              recentSearchesTitle: '最近搜索',
              favoriteSearchesTitle: '收藏的搜索',
              removeFavoriteSearchButtonTitle: '移除收藏',
              noRecentSearchesText: '暂无搜索记录',
              removeRecentSearchButtonTitle: '移除最近搜索',
              saveRecentSearchButtonTitle: '保存搜索记录'
            },
            noResultsScreen: {
              noResultsText: '无法找到相关结果',
              suggestedQueryText: '你可以尝试搜索',
            },
            searchBox: {
              cancelButtonText: '取消',
              resetButtonTitle: '重置搜索内容',
            },
            footer: {
              searchByText: '搜索引擎：',
              closeText: '关闭搜索窗口',
              navigateText: '切换选择',
              selectText: '选择',
            }
          }
        }}
        searchParameters={{
          // maxFacetHits: 10,
          // hitsPerPage: 20,
        }}
      />
    </div>
  )
}

export default GlobalSearch
