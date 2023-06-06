<template>
  <div class="app">
    <PostForm :posts="posts" @create="createPost" />
    <PostsList :posts="posts" />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      posts: [
        { id: 1, title: "JavaScript", body: "JavaScript - универсальный язык программирования" },
        { id: 2, title: "Python", body: "Python - популярный язык программирования" },
        { id: 3, title: "Kotlin", body: "Kotlin - быстроразвивающийся язык программирования" },
      ],
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.flex-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
