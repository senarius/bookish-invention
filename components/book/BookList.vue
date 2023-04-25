<template>
  <table v-if="items.length > 0" class="w-full">
    <tr
      class="flex mx-auto h-24 bg-white rounded-md shadow-md p-5 px-10 flex items-center justify-between mb-5"
    >
      <th>Title</th>
      <th>Author</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
    <book-item v-for="item in items" :key="item._id" :book="item" />
  </table>
</template>

<script lang="ts" setup>
import { Books } from '~~/types/book'

defineProps<{
  items: Books
}>()
</script>
