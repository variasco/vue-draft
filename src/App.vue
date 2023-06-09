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
    <div class="pages">
      <div
        class="page"
        :class="{
          'current-page': pageNumber === page,
        }"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
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
      page: 1,
      limit: 10,
      totalPages: 0,
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
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.posts = response.data;
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
      } catch (error) {
        console.log("Error!", error);
      } finally {
        this.isPostsLoading = false;
      }
    },
    changePage(page) {
      this.page = page;
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
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    page() {
      this.fetchPosts();
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

body {
  font-family: "Roboto", sans-serif;
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

.pages {
  display: flex;
  margin-top: 12px;
  gap: 2px;
}

.page {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 2px;
  font-size: 14px;
  color: teal;
}

.page:hover {
  background-color: rgba(43 235 235 / 0.25);
}

.current-page {
  background-color: rgba(43 235 235 / 0.5);
}
</style>
