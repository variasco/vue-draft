<template>
  <button class="button"><slot /></button>
</template>

<script>
export default {
  name: "Button",
};
</script>

<style scoped>
.button {
  line-height: 17px;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}
</style>
