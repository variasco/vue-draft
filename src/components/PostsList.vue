<template>
  <div class="posts flex-container">
    <h3>Список постов</h3>
    <PostItem
      v-if="posts.length"
      v-for="post in posts"
      key="post.id"
      :post="post"
      @delete="deletePost"
    />
    <p v-else>Список постов пуст</p>
  </div>
</template>

<script>
import PostItem from "./PostItem";

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
      default: [],
    },
  },
  methods: {
    deletePost(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<style scoped></style>
