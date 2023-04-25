<template>
  <div>
    <section
      class="max-w-screen-lg mx-auto items-center justify-center mt-7 bg-white shadow p-5"
    >
      <book-input
        v-model="newBook"
        @save="saveNewBook"
        :error="error"
      ></book-input>
      <book-list :items="bookStore.getSortedBooks.reverse()"></book-list>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useBookStore } from '~~/store/book'

const bookStore = useBookStore()
const newBook = ref({ title: '', author: '', done: false })
const error = ref(false)

const saveNewBook = () => {
  error.value = false

  if (newBook.value.title.length <= 0 || newBook.value.author.length <= 0) {
    error.value = true
    return
  }

  bookStore.add({
    title: newBook.value.title,
    author: newBook.value.author,
    done: newBook.value.done,
  })
}

onMounted(() => {
  bookStore.fetchComments()
  bookStore.fetchBooks()
})
</script>
