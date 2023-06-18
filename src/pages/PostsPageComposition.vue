<template>
  <div>
    <h1>Страница с постами</h1>

    <Input style="margin-top: 12px" v-model="searchQuery" placeholder="Search..." />
    <div style="margin: 12px 0" class="buttons">
      <Button>Создать пост</Button>
      <Select v-model="selectedSort" :options="sortOptions" />
    </div>

    <Dialog v-model:show="dialogVisible">
      <PostForm :posts="searchedAndSortedPosts" />
    </Dialog>

    <PostsList :posts="searchedAndSortedPosts" :isLoading="isPostsLoading" />

    <!-- <div v-intersection="fetchMorePosts" class="observer"></div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
        { value: "id", name: "По порядку" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, searchedAndSortedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      searchedAndSortedPosts,
    };
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
