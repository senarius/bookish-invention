<template>
  <list-comment-container>
    <div class="w-full overflow-hidden whitespace-nowrap text-ellipsis">
      <p
        class="text-base text-gray-700 select-none font-light"
        :title="comment.remark"
      >
        {{ comment.remark }}
    </p>
      <p>
        <small class="text-gray-400">
          {{ parsedDate }}
        </small>
      </p>
    </div>
    <section class="flex items-center">
      <x-circle-icon
        class="w-10 h-10 transition-all duration-200 text-red-400 cursor-pointer hover:text-red-600"
        @click="deleteComment(comment._id)"
      />
    </section>
  </list-comment-container>
</template>

<script lang="ts" setup>
  import { XCircleIcon } from "@heroicons/vue/outline/index.js"
  import { useBookStore } from "~~/store/book";
  import { Comment } from "~~/types/comment"
  const props = defineProps<{
    comment: Comment;
  }>();
  const bookStore = useBookStore()
  const deleteComment = (id: string) => bookStore.removeComment(id)
  const parsedDate = computed(() =>
    new Intl.DateTimeFormat("en-US").format(new Date(props.comment.createdAt))
  )
</script>
