<template>
  <div class="flex">
    <input v-model="isbn" placeholder="9780575099913" class="border rounded py-2 px-4 w-9/12 focus:outline-1 focus:outline-blue-100"/>
    <button @click="search" class="w-3/12 py-2 ml-2 rounded border border-gray-300 bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 disabled:bg-gray-400 disabled:text-white">search</button>
  </div>
  <div
    class="flex mx-auto h-24 bg-white rounded-md shadow-sm items-center justify-between mb-5"
  >
    <input
      v-model="localBookValue.title"
      type="text"
      placeholder="Title"
      :class="{
        'border-red-300': error,
        'border-gray-300': !error,
      }"
      class="border rounded py-2 px-4 w-9/12 focus:outline-1 focus:outline-blue-100"
      @keypress.enter="$emit('save')"
    />
    <input
      v-model="localBookValue.author"
      type="text"
      placeholder="Author"
      :class="{
        'border-red-300': error,
        'border-gray-300': !error,
      }"
      class="ml-2 border rounded py-2 px-4 w-9/12 focus:outline-1 focus:outline-blue-100"
      @keypress.enter="$emit('save')"
    />
    <input
      v-model="localBookValue.done"
      type="checkbox"
      placeholder="Book"
      :class="{
        'border-red-300': error,
        'border-gray-300': !error,
      }"
      class="ml-2 border rounded py-2 px-4 w-9/12 focus:outline-1 focus:outline-blue-100"
      @keypress.enter="$emit('save')"
    />
    <button
      class="w-5/12 py-2 ml-2 rounded border border-gray-300 bg-green-600 hover:bg-green-700 transition-all duration-200 disabled:bg-gray-400 disabled:text-white"
      :disabled="loading"
      @click="$emit('save')"
    >
      {{ loading ? "Loading..." : "Add" }}
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { Book } from "~~/store/book"

  const props = defineProps<{
    modelValue: Book
    error: boolean
    loading: boolean
  }>();
  const emit = defineEmits<{
    (e: "update:modelValue", value: Book): void
    (e: "save"): void
  }>()

  const localBookValue = computed({
    get() {
      return props.modelValue
    },
    set(value: Book) {
      emit("update:modelValue", value)
    },
  })

  const isbn = ref('9780575099913')
  const fetchBookInfo = async () =>
  $fetch<any[]>("https://www.googleapis.com/books/v1/volumes", {
    params: {
      q: isbn.value,
    },
  })
  const { data: bookInfo } = useAsyncData("bookInfo", () => fetchBookInfo())
  const search = async () => {
    bookInfo.value = await fetchBookInfo()
    if (bookInfo.value.totalItems > 0) {
      localBookValue.value.title = bookInfo.value.items[0].volumeInfo.title
      localBookValue.value.author = bookInfo.value.items[0].volumeInfo.authors[0]
    } else {
      localBookValue.value.title = ''
      localBookValue.value.author = ''
    }
  };
</script>
