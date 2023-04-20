import { Comments } from './comment'

export interface Book {
  _id: string
  title: string
  author: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BookAdd {
  title: string
  author: string
  done: boolean
}

export interface BookUpdate {
  title?: string
  author?: string
  done?: boolean
}

export type Books = Book[] | undefined[]

export interface BookState {
  items: Books
  comments: Comments
}