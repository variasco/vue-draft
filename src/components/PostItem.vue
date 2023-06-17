<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post-buttons">
      <Button @click="deletePost">Удалить</Button>
      <Button @click="$router.push(`/post/${post.id}`)">Открыть</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePost() {
      this.$emit("delete", this.post.id);
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
.post-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
