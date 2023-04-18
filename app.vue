<template>
  <div>
    <div class="w-full min-h-screen bg-gray-100" >
      <section class="text-center pt-7">
        <h1 class="text-5xl mt-5">My Book list</h1>
      </section>
      <section class="max-w-screen-lg mx-auto items-center justify-center mt-7 bg-white shadow p-5">
        <book-input v-model="newBook" @save="saveNewBook" :error="error"></book-input>
        <book-list :items="bookStore.getSortedBooks.reverse()"></book-list>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useBookStore } from "~~/store/book";
  
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
</script>
