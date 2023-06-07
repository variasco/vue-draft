<template>
  <input class="input" type="text" :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: "Input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
}
</style>
