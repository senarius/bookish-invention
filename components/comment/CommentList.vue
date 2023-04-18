<template>
  <section v-if="items.length > 0" class="flex flex-wrap">
    <comment-item v-for="item in items" :key="item.id" :comment="item" />
  </section>
</template>

<script lang="ts" setup>
  import { Comments } from "~~/store/book"
  defineProps<{
    items: Comments
  }>();
</script>
