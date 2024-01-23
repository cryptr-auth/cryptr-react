import React from 'react'
import { FriendsSuggestionsProps } from '../utils/types'
import FriendSuggestion from './FriendSuggestion'


function FriendsSuggestions({friends}: FriendsSuggestionsProps){

  return (
    <section aria-labelledby="do-you-know-heading">
      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <h2 id="do-you-know-heading" className="text-base font-medium text-gray-900">Do you know...</h2>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-4 divide-y divide-gray-200">
              {friends && friends.length > 1 ? friends.map((f) => <FriendSuggestion key={`friend-${f.nickname}`} friend={f}/>) : (
                <li>
                  No Suggestion
                </li>
              )}

            </ul>
          </div>
          {friends && friends.length > 0 && (
            <div className="mt-6">
              <a href="#"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">View
                all</a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FriendsSuggestions
