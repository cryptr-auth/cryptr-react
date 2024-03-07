import React from 'react'
import { NewsProps } from '../utils/types'
import NewsItem from './NewsItem'

function News({ newsItems }: NewsProps) {
  return (
    <section aria-labelledby="new-heading">
      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <h2 id="new-heading" className="text-base font-medium text-gray-900">
            New
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {newsItems !== undefined && newsItems.length > 1 ? (
                newsItems.map((n) => <NewsItem key={`news-${n.id}`} newsItem={n} />)
              ) : (
                <li>No News</li>
              )}
            </ul>
          </div>
          {newsItems && newsItems.length > 0 && (
            <div className="mt-6">
              <a
                href="/"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                View all
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default News
