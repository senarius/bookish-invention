<template>
  <list-item-container :class="{'bg-green-300': book.done,}">
    <td>
      <h1
        class="text-2xl text-gray-700 select-none font-light uppercase"
        :title="book.title"
      >
        {{ book.title }}
      </h1>
    </td>
    <td>
      <p
        class="text-base text-gray-700 select-none font-light uppercase"
        :title="book.author"
      >
        {{ book.author }}
      </p>
    </td>
    <td>
      <p>
        <small class="text-gray-400">
          {{ parsedDate }}
        </small>
      </p>
    </td>
    <td class="flex items-center">
      <check-circle-icon
        class="w-10 h-10 transition-all duration-200 hover:text-green-400 mr-3 cursor-pointer"
        :class="{
          'text-green-400': book.done,
          'text-gray-400': !book.done,
        }"
        @click="updateBookDone(book)"
      />
      <x-circle-icon
        class="w-10 h-10 transition-all duration-200 text-red-400 cursor-pointer hover:text-red-600"
        @click="deleteBook(book.id)"
      />
    </td>
  </list-item-container>
  <comment-input v-model="newComment" @save="saveNewComment(book)" :error="error" ></comment-input>
  <comment-list :items="bookStore.getCommentsByBook(book.id)" ></comment-list>
  
</template>

<script lang="ts" setup>
  import { XCircleIcon, CheckCircleIcon } from "@heroicons/vue/outline/index.js"
  import { useBookStore } from "~~/store/book";
  import { Book } from "~~/store/book"
  const props = defineProps<{
    book: Book;
  }>();
  const bookStore = useBookStore()
  const deleteBook = (id: string) => bookStore.remove(id)
  const updateBookDone = (book: Book) => {
    const currentState = book.done
    bookStore.update(book.id, { done: !currentState })
  };
  const parsedDate = computed(() =>
    new Intl.DateTimeFormat("en-US").format(new Date(props.book.createdAt))
  )
  
  // comment per book
  const newComment = ref('')
  const error = ref(false)

  const saveNewComment = (book: Book) => {
    error.value = false

    if (newComment.value.length <= 0) {
      error.value = true
      return
    }

    bookStore.addComment({
      remark: newComment.value,
      bookId: book.id,
    })
  }
</script>
