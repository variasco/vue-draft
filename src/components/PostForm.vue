<template>
  <form class="form flex-container" action="">
    <input
      class="input"
      type="text"
      placeholder="Описание"
      :value="post.title"
      @input="onTitleChange"
    />
    <input
      class="input"
      type="text"
      placeholder="Название"
      :value="post.body"
      @input="onBodyChange"
    />
    <button class="button" @click="createPost">Создать</button>
  </form>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
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
    onTitleChange(e) {
      this.post.title = e.target.value;
    },
    onBodyChange(e) {
      this.post.body = e.target.value;
    },
    createPost(e) {
      e.preventDefault();
      if (!this.post.title || !this.post.body) return;
      
      const posts = this.posts;
      const lastInsertedId = posts[posts.length - 1].id;
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
