import React, {useEffect, useState} from 'react'
import FriendsSuggestions from '../components/FriendsSuggestions'
import Header from '../components/Header'
import News from '../components/News'
import Articles from '../components/Articles'
import SidebarNav from '../components/SidebarNav'
import { useCryptr } from '@cryptr/cryptr-react'


const Dashboard = () => {
  const [articles, setArticles] = useState([])
  const [friends, setFriends] = useState([])
  const [news, setNews] = useState([])
  const [fetched, setFetched] = useState(false)
  const {getCurrentAccessToken} = useCryptr()

  async function fetchAPIData(){
    try {
      const response = await fetch('http://localhost:5000', {method: 'GET', headers: {Authorization: `Bearer ${getCurrentAccessToken()}`}})
      const data = await response.json()
      const {articles, friends, news} = data
      setArticles(articles)
      setNews(news)
      setFriends(friends)
      setFetched(true)
    } catch (error) {
     console.error(error)
    }
  }

  useEffect(() => {
    if(!fetched) {
      fetchAPIData()
    }
  }, [fetched])


  return (
    <div className="min-h-full">
      <Header />

      <div className="py-10">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <SidebarNav/>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            <Articles articles={articles}/>
          </main>
          <aside className="hidden xl:col-span-4 xl:block">
            <div className="sticky top-4 space-y-4">
              <FriendsSuggestions friends={friends}/>
              <News newsItems={news}/>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
