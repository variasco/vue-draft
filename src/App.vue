<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <Input style="margin-top: 12px" v-model="searchQuery" placeholder="Search..." />
    <div style="margin: 12px 0" class="buttons">
      <Button @click="showDialog">Создать пост</Button>
      <Select v-model="selectedSort" :options="sortOptions" />
    </div>

    <Dialog v-model:show="dialogVisible">
      <PostForm :posts="searchedAndSortedPosts" @create="createPost" />
    </Dialog>
    <PostsList :posts="searchedAndSortedPosts" @delete="deletePost" :isLoading="isPostsLoading" />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";
import axios from "axios";

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
        { value: "id", name: "По порядку" },
      ],
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
        this.posts = response.data;
      } catch (error) {
        console.log("Error!", error);
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        if (typeof a[this.selectedSort] === "number") return a - b;
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
    searchedAndSortedPosts() {
      return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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

.buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
