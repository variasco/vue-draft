<template>
  <div class="flex-container">
    <h3>Список постов</h3>
    <div class="flex-container" v-if="!isLoading">
      <transition-group name="posts-list">
        <PostItem
          v-if="posts.length"
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @delete="deletePost"
        />
        <p v-else>Список постов пуст</p>
      </transition-group>
    </div>
    <div v-else>Загрузка...</div>
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
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    deletePost(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<style scoped>
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}

.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.5s ease;
}

.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.posts-list-move {
  transition: transform 0.8s ease;
}
</style>
