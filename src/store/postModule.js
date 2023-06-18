import axios from "axios";

export const postModule = {
  namespaced: true,
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        if (typeof a[state.selectedSort] === "number") return a - b;
        return a[state.selectedSort]?.localeCompare(b[state.selectedSort]);
      });
    },
    searchedAndSortedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, sort) {
      state.selectedSort = sort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        // this.isPostsLoading = true;
        commit("setLoading", true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });
        // this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
        // this.posts = response.data;
        commit("setPosts", response.data);
      } catch (error) {
        console.log("Error!", error);
      } finally {
        // this.isPostsLoading = false;
        commit("setLoading", false);
      }
    },
    async fetchMorePosts({ state, commit }) {
      try {
        // this.page += 1;
        commit("setPage", state.page + 1);
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });
        // this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / this.limit));
        // this.posts = [...this.posts, ...response.data];
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (error) {
        console.log("Error!", error);
      }
    },
  },
};
