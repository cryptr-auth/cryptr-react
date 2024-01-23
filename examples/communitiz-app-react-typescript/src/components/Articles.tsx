import React, { useEffect, useState } from 'react'
import Article from './Article'
import { ArticleItem, ArticlesProps, SortType } from '../utils/types'

const DEFAULT_SORT = SortType.Recent;

const Articles = ({articles}: ArticlesProps) => {
  const [currentSort, setCurrentSort] = useState<SortType>(DEFAULT_SORT)
  const [sortedArticles, setSortedArticles] = useState<ArticleItem[] | undefined>()

  const sorts = [
    {title: 'Recent', type: SortType.Recent},
    {title: 'Most liked', type: SortType.MostLiked},
    {title: 'Most answers', type: SortType.MostAnswers},
  ]

  const sortArticles = (sort: SortType, articles?: ArticleItem[]) => {
    if (articles !== undefined) {
      switch (sort) {
        case SortType.MostAnswers:
          setSortedArticles(articles.sort((a1,a2) => a1.replies - a2.replies))
          break;
        case SortType.MostLiked:
          setSortedArticles(articles.sort((a1,a2) => a1.likes - a2.likes))
          break;

        default:
          setSortedArticles(articles.sort((a1,a2) => {
            return new Date(a2.publish_date).getTime() - new Date(a1.publish_date).getTime()
          }))
          break;
      }
    }
  }

  useEffect(() => {
    sortArticles(DEFAULT_SORT, articles)
  }, [articles])

  useEffect(() => {
   sortArticles(currentSort, articles)
  }, [currentSort, articles])

  return (
    <>
      <div className="px-4 sm:px-0">
        <div className="sm:hidden">
          <label className="sr-only">Select a tab</label>
          <select id="question-tabs"
          defaultValue={'recent'}
            className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600">
            <option>Recent</option>

            <option>Most Liked</option>

            <option>Most Answers</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
            {sorts.map(({title, type}) => (
              <button
                key={type}
                onClick={() => setCurrentSort(type)}
                 className="group relative min-w-0 cursor-pointer flex-1 overflow-hidden bg-white py-4 px-6 text-sm text-center hover:bg-gray-50 focus:z-10 font-medium">
                {title}
                {type === currentSort && <span aria-hidden="true" v-if="sort.key == currentSort" className="bg-blue-700 absolute inset-x-0 bottom-0 h-0.5"></span>}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="sr-only">Recent questions</h1>
        {sortedArticles && sortedArticles.length > 0 ? (
          <ul className="space-y-4">
            {sortedArticles.map((a: ArticleItem) => <Article key={`article-${a.id}`} article={a}/>)}
          </ul>
        ): (
          <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
            <article aria-labelledby="question">
              <div>
                <span>No Article</span>
              </div>
            </article>
          </li>
        )}
      </div>
    </>
  )
}

export default Articles
