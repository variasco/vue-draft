<template>
  <form class="form flex-container" action="">
    <Input type="text" placeholder="Название" v-model="post.title" />
    <Input type="text" placeholder="Описание" v-model="post.body" />
    <Button style="align-self: flex-start" @click="createPost">Создать</Button>
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
      const lastInsertedId = posts?.[posts.length - 1]?.id || 0;
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
</style>
