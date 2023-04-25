import { setActivePinia, createPinia } from 'pinia'
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  vi
} from 'vitest'
import { useBookStore } from './book'
import { ref } from 'vue'

function getFirstId(store: ReturnType<typeof useBookStore>) {
  return store.items[0]._id
}

function getFirstCommentId(store: ReturnType<typeof useBookStore>) {
  return store.comments[0]._id
}

beforeAll(() => {
  vi.mock('#imports', () => {
    return {
      useRuntimeConfig() {
        return {
          public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/',
          }
        }
      }
    }
  })

  setActivePinia(createPinia())

  // @ts-ignore
  global.useFetch = async () => {
    return {
      data: {
        _id: '1234',
        title: 'The Witcher',
        author: 'Andrzej Sapkowski',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }
})

afterAll(() => {
  global.useFetch = useFetch
})

describe('initializes', () => {
  test('works', () => {
    expect(true).toBe(true)
  })
})

describe('useBookStore', () => {
  let store: ReturnType<typeof useBookStore>

  beforeEach(() => {
    store = useBookStore()
  })

  afterEach(() => {
    store.$reset()
  })

  test('references a store', () => {
    expect(store).toBeDefined()
  })

  test('has empty books on init', () => {
    expect(store.items).toStrictEqual([])
  })

  test('adds a book', async () => {
    const data = ref({
      book: {
        _id: '1234',
        title: 'The Witcher',
        author: 'Andrzej Sapkowski',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      books: [
        {
          _id: '1234',
          title: 'The Witcher',
          author: 'Andrzej Sapkowski',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    // @ts-ignore
    global.useFetch = () => ({ data: data })

    await store.add({
      title: 'The Witcher',
      author: 'Andrzej Sapkowski',
      done: false,
    })

    expect(store.items).toStrictEqual([
      {
        _id: expect.any(String),
        title: 'The Witcher',
        author: 'Andrzej Sapkowski',
        done: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ])
  })

  test('gets book by id', async () => {
    await store.add({
      title: 'The Witcher',
      author: 'Andrzej Sapkowski',
      done: false,
    })

    const book = store.items[0]

    const item = store.getbookById(book._id)
    expect(item.title).toBe('The Witcher')
  })

  test('gets ordered items without mutating original', async () => {
    const items = [
      {
        createdAt: new Date(2021, 1, 22),
      },
      {
        createdAt: new Date(2023, 1, 22),
      },
      {
        createdAt: new Date(2020, 1, 22),
      },
      {
        createdAt: new Date(1994, 1, 22),
      },
    ]

    // @ts-ignore
    store.items = items

    const sortedItems = store.getSortedBooks

    expect(sortedItems[0].createdAt.getFullYear()).toBe(1994)
    expect(sortedItems[1].createdAt.getFullYear()).toBe(2020)
    expect(sortedItems[2].createdAt.getFullYear()).toBe(2021)
    expect(sortedItems[3].createdAt.getFullYear()).toBe(2023)
    expect(store.items[0].createdAt.getFullYear()).toBe(2021)
  })

  test('deletes a book', async () => {
    await store.add({
      title: 'Delete me',
      author: 'Andrzej Sapkowski',
      done: false,
    })
    const id = getFirstId(store)

    await store.remove(id)
    expect(store.items).toStrictEqual([])
  })

  test('updates a book title', async () => {
    await store.add({ title: 'Edit Me' })
    const id = getFirstId(store)
    await store.update(id, { title: 'Edited' })
    expect(store.getbookById(id).title).toBe('Edited')
  })

  test('updates a book done', async () => {
    await store.add({ title: 'Edit Me' })
    const id = getFirstId(store)
    await store.update(id, { done: true })
    expect(store.getbookById(id).done).toBe(true)
  })

  test('gets comments by book id', async () => {
    await store.add({
      _id: '1234',
      title: 'The Witcher',
      author: 'Andrzej Sapkowski',
      done: false,
    })

    const book = store.items[0]

    const data = ref({
      comments: [
        {
          _id: '2222',
          remark: 'comment 1',
          bookId: book._id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    // @ts-ignore
    global.useFetch = () => ({ data: data })

    await store.addComment({
      remark: 'comment 1',
      bookId: book._id,
    })

    expect(store.comments.length).toBe(1)
    expect(store.getCommentsByBook(book._id).length).toBe(1)
  })

  test('deletes a comment', async () => {

    const data = ref({
      comments: [],
      comment: {
        _id: '2222',
        remark: 'comment 1',
        bookId: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // @ts-ignore
    global.useFetch = () => ({ data: data })

    await store.removeComment('2222')
    expect(store.comments).toStrictEqual([])
  })

  test('fetches books', async () => {
    const data = ref({
      books: [
        {
          _id: '1234',
          title: 'The Witcher',
          author: 'Andrzej Sapkowski',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    // @ts-ignore
    global.useFetch = () => ({ data: data })

    await store.fetchBooks()
    expect(store.items.length).toBeGreaterThan(0)
  })
})
