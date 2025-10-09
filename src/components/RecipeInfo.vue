<template>
    <div class="recipe-detail">
      <RouterLink to="/" class="back-btn">
        ← Назад к списку
      </RouterLink>
  
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        Загрузка рецепта...
      </div>
  
      <div v-else-if="error" class="error">
        Ошибка при загрузке рецепта: {{ error }}
        <button @click="fetchRecipe" class="retry-btn">
          Попробовать снова
        </button>
      </div>
  
      <div v-else-if="recipe" class="recipe-content">

        <div class="recipe-header">
          <div class="recipe-image">
            <img :src="recipe.image" :alt="recipe.name" />
          </div>
          
          <div class="recipe-info">
            <h1>{{ recipe.name }}</h1>
            
            <div class="recipe-stats">
              <div class="stat">
                <span class="stat-label">Рейтинг:</span>
                <span class="stat-value">{{ recipe.rating }} ({{ recipe.reviewCount }} отзывов)</span>
              </div>
              <div class="stat">
                <span class="stat-label">Кухня:</span>
                <span class="stat-value">{{ recipe.cuisine }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Подготовка:</span>
                <span class="stat-value">{{ recipe.prepTimeMinutes }} мин</span>
              </div>
              <div class="stat">
                <span class="stat-label">Приготовление:</span>
                <span class="stat-value">{{ recipe.cookTimeMinutes }} мин</span>
              </div>
              <div class="stat">
                <span class="stat-label">Общее время:</span>
                <span class="stat-value">{{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} мин</span>
              </div>
              <div class="stat">
                <span class="stat-label">Порции:</span>
                <span class="stat-value">{{ recipe.servings }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Сложность:</span>
                <span class="stat-value difficulty" :class="`difficulty-${recipe.difficulty.toLowerCase()}`">
                  {{ recipe.difficulty }}
                </span>
              </div>
            </div>
  
            <div class="meal-types">
              <span v-for="mealType in recipe.mealType" :key="mealType" class="meal-tag">
                {{ mealType }}
              </span>
            </div>
          </div>
        </div>

        <div class="recipe-sections">
          <div class="section">
            <h2>Ингредиенты</h2>
            <ul class="ingredients-list">
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient">
                {{ ingredient }}
              </li>
            </ul>
          </div>
  
          <div class="section">
            <h2>Рецепт</h2>
            <ol class="instructions-list">
              <li v-for="(instruction, index) in recipe.instructions" :key="index" class="instruction">
                {{ instruction }}
              </li>
            </ol>
          </div>
        </div>
  
        <div class="section" v-if="recipe.reviewCount > 0">
          <h2>Отзывы ({{ recipe.reviewCount }})</h2>
          <div class="reviews">
            <div class="rating-overview">
              <div class="rating-score">
                <span class="score">{{ recipe.rating }}/5</span>
              </div>
              <div class="rating-text">
                На основе {{ recipe.reviewCount }} отзывов
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'
  import {getRecipeById} from "../services/api.js";

  
  export default {
    name: 'RecipeInfo',
    props: {
      recipeId: {
        type: Object,
        required: true
      }
    },
    
    setup(props) {
      const recipe = ref(null)
      const loading = ref(true)
      const error = ref(null)
  
      const fetchRecipe = async () => {
        loading.value = true
        error.value = null
        
        try {
          recipe.value = await getRecipeById(props.recipeId)
        } catch (err) {
          console.error('Ошибка загрузки рецепта:', err)
          error.value = err.response?.data?.message || err.message || 'Неизвестная ошибка'
        } finally {
          loading.value = false
        }
      }

      onMounted(() => {
        fetchRecipe()
      })

      watch(() => props.recipeId, (newId) => {
        if (newId) {
          fetchRecipe()
        }
      })
  
      return {
        recipe,
        loading,
        error,
        fetchRecipe
      }
    }
  }
  </script>

<style scoped>
.recipe-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  border-radius: 12px;
  margin: 20px 0;
}

.loading {
  color: #c71585;
  background: #ffe6f0;
}

.error {
  color: #d6336c;
  background: #ffe3ed;
  border: 1px solid #f5c6cb;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e75480;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 15px;
  padding: 12px 24px;
  background: #e75480;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background: #d63b6a;
}

.recipe-content {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(231, 84, 128, 0.2);
  overflow: hidden;
}

.recipe-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  background: linear-gradient(135deg, #fcb1c3 0%, #f9a0c0 50%, #f78fb3 100%);
  color: white;
}

.recipe-image img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(231, 84, 128, 0.3);
}

.recipe-info h1 {
  margin: 0 0 25px 0;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(231, 84, 128, 0.4);
}

.recipe-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.stat-label {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.stat-value {
  color: white;
  font-weight: 500;
}

.difficulty {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
}

.difficulty-easy {
  background: #ffe6f0;
  color: #c71585;
}

.difficulty-medium {
  background: #fff0f5;
  color: #a83279;
}

.difficulty-hard {
  background: #fcd4e1;
  color: #8b0a50;
}

.meal-types {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meal-tag {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.recipe-sections {
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.section h2 {
  color: #c71585;
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px solid #f78fb3;
  padding-bottom: 10px;
}

.ingredients-list, .instructions-list {
  background: #fff0f5;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
}

.ingredient {
  padding: 12px 0;
  border-bottom: 1px solid #f8c7d0;
  position: relative;
  padding-left: 30px;
  font-size: 1rem;
  color: #6b184e;
  text-align: left;
}

.ingredient:last-child {
  border-bottom: none;
}

.instruction {
  padding: 15px 0;
  border-bottom: 1px solid #f8c7d0;
  font-size: 1rem;
  line-height: 1.6;
  color: #6b184e;
  margin-left: 20px;
}
.instruction::marker {
  color: #e75480;
  font-weight: bold;
  font-size: 1.1rem;
}

.rating-overview {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #fff0f5;
  padding: 20px;
  border-radius: 8px;
}

.score {
  font-size: 1.5rem;
  font-weight: bold;
  color: #c71585;
}

.rating-text {
  color: #6b184e;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .recipe-header {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  .recipe-sections {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  .recipe-info h1 {
    font-size: 2rem;
  }
  .recipe-image img {
    height: 250px;
  }
}
</style>