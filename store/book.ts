import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { Book, BookAdd, BookUpdate, Books, BookState } from '../types/book'
import { Comment, CommentAdd } from '../types/comment'

const state = (): BookState => ({
  items: [],
  comments: [],
})

const getters = {
  getbookById: (state: BookState) => {
    return (id: string) =>
      state.items.find((item) => !!item && (item as Book)._id === id)
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
    async add(partialBook: BookAdd) {
      const item: Book = {
        _id: uuid(),
        ...partialBook,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      try {
        const data = await useFetch(`/add-book/`, { baseURL: useRuntimeConfig().public.apiBase, method: 'POST', body: item })
          if (data.data.value) {
            this.items = data.data.value.books
          }
        }
        catch (error) {
          console.log(error)
      }
    },
    async addComment(partialComment: CommentAdd) {
      const item: Comment = {
        _id: uuid(),
        ...partialComment,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      try {
        const data = await useFetch(`/add-comment/`, { baseURL: useRuntimeConfig().public.apiBase, method: 'POST', body: item })
          if (data.data.value) {
            this.comments = data.data.value.comments
          }
        }
        catch (error) {
          console.log(error)
      }
    },
    async remove(id: string) {
      try {
        const data = await useFetch(`/delete-book/${id}`, { baseURL: useRuntimeConfig().public.apiBase, method: 'DELETE' })
        if (data.data.value) {
          this.items = data.data.value.books
        }
      }
      catch (error) {
        console.log(error)
      }
    },
    async removeComment(id: string) {
      try {
        const data = await useFetch(`/delete-comment/${id}`, { baseURL: useRuntimeConfig().public.apiBase, method: 'DELETE' })
        if (data.data.value) {
          this.comments = data.data.value.comments
        }
      }
      catch (error) {
        console.log(error)
      }
    },
    async update(id: string, update: BookUpdate) {
      try {
        const data = await useFetch(`/edit-book/${id}`, { baseURL: useRuntimeConfig().public.apiBase, method: 'PUT', body: update })
          if (data.data.value) {
            this.items = data.data.value.books
          }
        }
        catch (error) {
          console.log(error)
      }
      const idx = this.items.findIndex((item) => item._id === id)
      this.items[idx] = { ...this.items[idx], ...update, updatedAt: new Date() }
    },
    async fetchBooks() {
      try {
        const data = await useFetch('/books', { baseURL: useRuntimeConfig().public.apiBase })
          if (data.data.value) {
            this.items = data.data.value.books
          }
        }
        catch (error) {
          console.log(error)
      }
    },
    async fetchComments() {
      try {
        const data = await useFetch(`/comments`, { baseURL: useRuntimeConfig().public.apiBase })
          if (data.data.value) {
            this.comments = data.data.value.comments
          }
        }
        catch (error) {
          console.log(error)
      }
    }
  },
})
