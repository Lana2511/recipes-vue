<template>
  <div class="recipe-list">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      Загрузка рецептов...
    </div>

    <div v-else-if="error" class="error">
      Ошибка при загрузке: {{ error }}
      <button @click="fetchRecipes" class="retry-btn">
        Попробовать снова
      </button>
    </div>

    <div v-else class="recipes">
      <RouterLink
        v-for="recipe in recipes"
        :key="recipe.id"
        :to="`/recipes/${recipe.id}`"
        class="recipe-item"
      >
        <RecipeItem
            :recipe="recipe"
        />
      </RouterLink>
    </div>

    <div v-if="!loading && recipes.length === 0" class="empty">
      Рецепты не найдены
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getRecipes } from "../services/api.js";
import RecipeItem from './RecipeItem.vue'

export default {
  name: 'RecipesList',
  components: {
    RecipeItem
  },
  
  setup() {
    const recipes = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchRecipes = async () => {
      loading.value = true
      error.value = null
      
      try {
        recipes.value = await getRecipes()
      } catch (err) {
        error.value = err.message
        console.error('Ошибка загрузки рецептов:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchRecipes()
    })

    return {
      recipes,
      loading,
      error,
      fetchRecipes
    }
  }
}
</script>

<style scoped>
.recipe-list {
  padding: 20px 0;
}

.recipes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
}

.recipe-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 0 0 calc(20% - 16px);
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  background: #fdf2f2;
  border-radius: 8px;
  margin: 20px 0;
}

.retry-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #2980b9;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}
</style>
