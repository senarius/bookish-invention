import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

export interface Book {
  id: string
  title: string
  author: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

export type Books = Book[] | undefined[]

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

export interface BookState {
  items: Books
  comments: Comments
}

const state = (): BookState => ({
  items: [],
  comments: [],
})

export interface Comment {
  id: string
  remark: string
  bookId: string
  createdAt: Date
  updatedAt: Date
}

export interface CommentAdd {
  remark: string
  bookId: string
}

export type Comments = Comment[] | undefined[]

const getters = {
  getbookById: (state: BookState) => {
    return (id: string) =>
      state.items.find((item) => !!item && (item as Book).id === id)
  },
  getSortedBooks: (state: BookState) => {
    return [...state.items].sort(
      (a: Book, b: Book) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  },
  getCommentsByBook: (state: BookState) => {
    return (id: string) =>
      state.comments.filter((item) => item.bookId === id)
  },
}

export const useBookStore = defineStore('bookStore', {
  state,
  getters,
  actions: {
    add(partialBook: BookAdd) {
      const item: Book = {
        id: uuid(),
        ...partialBook,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.items.push(item)
    },
    addComment(partialComment: CommentAdd) {
      const item: Comment = {
        id: uuid(),
        ...partialComment,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.comments.push(item)
    },
    remove(id: string) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    removeComment(id: string) {
      this.comments = this.comments.filter((item) => item.id !== id)
    },
    update(id: string, update: BookUpdate) {
      const idx = this.items.findIndex((item) => item.id === id)
      this.items[idx] = { ...this.items[idx], ...update, updatedAt: new Date() }
    },
  },
})
