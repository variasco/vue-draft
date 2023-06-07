<template>
  <form class="form flex-container" action="">
    <input class="input" type="text" placeholder="Название" v-model="post.title" />
    <input class="input" type="text" placeholder="Описание" v-model="post.body" />
    <button class="button" @click="createPost">Создать</button>
  </form>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost(e) {
      e.preventDefault();
      if (!this.post.title || !this.post.body) return;

      const posts = this.posts;
      const lastInsertedId = posts?.[posts.length - 1]?.id || 1;
      this.post.id = lastInsertedId + 1;
      this.$emit("create", this.post);

      this.post = { title: "", body: "" };
    },
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 15px;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
}

.button {
  align-self: flex-start;

  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}
</style>
