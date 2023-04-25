<template>
  <section v-if="items.length > 0" class="flex flex-wrap">
    <comment-item v-for="item in items" :key="item._id" :comment="item" />
  </section>
</template>

<script lang="ts" setup>
import { Comments } from '~~/types/comment'
defineProps<{
  items: Comments
}>()
</script>
