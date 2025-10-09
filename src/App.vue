<template>
  <div id="app">
    <h1>Сборник рецептов</h1>
    <RouterView />
  </div>
</template>

<script>
import { ref } from 'vue'
import RecipesList from './components/RecipesList.vue'
import RecipeInfo from './components/RecipeInfo.vue'

export default {
  name: 'App',
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: #6b184e;
}
</style>