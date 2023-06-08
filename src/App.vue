<template>
  <div class="app">
    <h1 class="header">Страница с постами</h1>
    <Button @click="showDialog">Создать пост</Button>
    <Dialog v-model:show="dialogVisible">
      <PostForm :posts="posts" @create="createPost" />
    </Dialog>
    <PostsList :posts="posts" @delete="deletePost" />
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
      dialogVisible: false,
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    showDialog() {
      this.dialogVisible = true;
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

.header {
  margin-bottom: 12px;
}

.flex-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
