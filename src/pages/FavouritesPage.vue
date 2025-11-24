<template>
  <div class="favourites-page">
    <div  class="header">
      <h1 class="title">Сборник рецептов</h1>
    </div>
    <h1>Избранное ❤️</h1>
    <RouterLink to="/" class="back-btn">
      ← Назад к рецептам
    </RouterLink>

    <div class="recipes-container" v-if="filtered.length">
      <div class="recipes">
        <RouterLink
            v-for="recipe in filtered"
            :key="recipe.id"
            :to="`/recipes/${recipe.id}`"
            class="recipe-item"
        >
          <RecipeItem :recipe="recipe" />
        </RouterLink>
      </div>
    </div>

    <div v-else class="empty">
      Нет избранных рецептов
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getRecipes } from '../services/api.js'
import RecipeItem from '../components/RecipeItem.vue'
import { useLikesStore } from '../stores/useLikesStore.js'

const recipes = ref([])
const likesStore = useLikesStore()

onMounted(async () => {
  recipes.value = await getRecipes()
})

const filtered = computed(() =>
    recipes.value.filter(r => likesStore.isFavourite(r.id))
)
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: #6b184e;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

.back-btn {
  display: inline-block;
  background: #e75480;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 30px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-decoration: none;
}

.back-btn:hover {
  background: #d63b6a;
  transform: translateY(-1px);
}

.recipes-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px 0;
  width: 100%;
  max-width: 1400px;
}

.recipe-item {
  width: 100%;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-item:hover {
  transform: translateY(-4px);
}
</style>
