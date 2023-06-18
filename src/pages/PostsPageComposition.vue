<template>
  <div>
    <h1>Страница с постами</h1>

    <Input
      style="margin-top: 12px"
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..."
    />
    <div style="margin: 12px 0" class="buttons">
      <Button @click="showDialog">Создать пост</Button>
      <Select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>

    <Dialog v-model:show="dialogVisible">
      <PostForm :posts="searchedAndSortedPosts" @create="createPost" />
    </Dialog>

    <PostsList :posts="searchedAndSortedPosts" @delete="deletePost" :isLoading="isPostsLoading" />

    <div v-intersection="fetchMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      fetchMorePosts: "post/fetchMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
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
    changePage(page) {
      this.page = page;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      searchedAndSortedPosts: "post/searchedAndSortedPosts",
    }),
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
