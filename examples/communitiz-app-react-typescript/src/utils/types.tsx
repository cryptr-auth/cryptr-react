// Models
export type Friend = {
  avatar: string;
  name: string;
  nickname: string
}

export type NewsPiece = {
  id: number;
  avatar: string;
  content: string;
  comments_count: number
}

export type ArticleItem = {
  id: number;
  avatar: string;
  publish_date: Date;
  author: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  views: number;
}

export enum SortType {
  Recent = 'recent',
  MostLiked = 'most_liked',
  MostAnswers = 'most_answers',
}

// Props

export type ArticlesProps = {
  articles?: ArticleItem[]
}

export type ArticleProps = {
  article: ArticleItem
}


export type FriendsSuggestionsProps = {
  friends?: Friend[]
}

export type FriendSuggestionProps = {
  friend: Friend
}

export type NewsProps = {
  newsItems?: NewsPiece[]
}

export type NewsItemProps = {
  newsItem: NewsPiece
}

export type ResponseData = {
  articles: ArticleItem[]
  friends: Friend[]
  news: NewsPiece[]
}
