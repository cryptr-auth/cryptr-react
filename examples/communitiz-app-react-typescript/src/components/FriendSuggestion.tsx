import React from 'react'
import { FriendSuggestionProps } from '../utils/types'

function FriendSuggestion({friend}: FriendSuggestionProps) {
  const {avatar, name, nickname} = friend

  return (
    <li className="flex items-center space-x-3 py-4">
      <div className="flex-shrink-0">
        <img className="h-8 w-8 rounded-full" alt="France Marcoux" src={avatar}/>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">
          <a href="/">
            {name}
            </a>
        </p>
        <p className="text-sm text-gray-500">
          <a href="/">
            @{nickname}
          </a>
        </p>
      </div>
      <div className="flex-shrink-0">
        <button type="button"
          className="inline-flex items-center rounded-full bg-indigo-200 px-3 py-0.5 text-sm font-medium text-blue-700 hover:bg-indigo-300">
          <svg className="-ml-1 mr-0.5 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor" aria-hidden="true">
            <path
              d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <span>Follow</span>
        </button>
      </div>
    </li>
  )
}
export default FriendSuggestion
