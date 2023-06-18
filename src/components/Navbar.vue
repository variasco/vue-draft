<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">Vue 3</div>
    <div class="buttons">
      <Button @click="$router.push('/posts')" style="margin-right: 20px">Посты</Button>
      <Button @click="$router.push('/composition')" style="margin-right: 20px">Посты 2.0</Button>
      <Button @click="$router.push('/about')">О приложении</Button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
}
</style>
