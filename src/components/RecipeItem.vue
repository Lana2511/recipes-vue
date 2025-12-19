<template>
  <div class="recipe-card-container">
    <RouterLink :to="`/recipe/${recipe.id}`" class="recipe-card-link">
      <div class="recipe-card">
        <div class="recipe-image">
          <img :src="recipe.image" :alt="recipe.name" />
          <div class="recipe-rating">
            {{ recipe.rating }} ({{ recipe.reviewCount }})
          </div>
        </div>

        <div class="recipe-content">
          <h3 class="recipe-title">{{ recipe.name }}</h3>

          <div class="recipe-meta">
            <span class="cook-time">
              {{ recipe.cookTimeMinutes }} мин
            </span>
            <span class="difficulty" :class="`difficulty-${recipe.difficulty.toLowerCase()}`">
              {{ recipe.difficulty }}
            </span>
          </div>

          <div class="recipe-cuisine">
            {{ recipe.cuisine }}
          </div>

          <div class="recipe-meal-type">
            {{ recipe.mealType.join(', ') }}
          </div>
        </div>
      </div>
    </RouterLink>

    <button class="like-btn" @click="toggleLike" :class="{'liked': isLiked}">
      <span v-if="!isLiked">❤️ </span>
      <span v-else>💔</span>
    </button>
  </div>
</template>

<script setup>
import {useLikesStore} from "../stores/useLikesStore.js";
import { computed } from "vue"

const props = defineProps ({
  recipe: {
    type: Object,
    required: true
  }
})

const likesStore = useLikesStore()
const isLiked = computed(() => likesStore.isFavourite(props.recipe.id))

const toggleLike = (event) => {
  event.preventDefault()
  event.stopPropagation()
  likesStore.toggleFavourite(props.recipe)
}
</script>

<style scoped>
.recipe-card-container {
  position: relative;
}

.recipe-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 0 0 calc(20% - 16px);
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.recipe-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.recipe-content {
  padding: 20px;
}

.recipe-title {
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  color: #2c3e50;
  line-height: 1.3;
  height: 3.12em;
}

.recipe-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cook-time {
  color: #666;
  font-size: 0.9rem;
}

.difficulty {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.difficulty-easy {
  background: #d4edda;
  color: #155724;
}

.difficulty-medium {
  background: #fff3cd;
  color: #856404;
}

.difficulty-hard {
  background: #f8d7da;
  color: #721c24;
}

.recipe-cuisine {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.recipe-meal-type {
  color: #721c24;
  font-size: 0.9rem;
}

.like-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 10;
}

.like-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.like-btn.liked {
  background: #000000;
  border-color: #e75480;
  color: white;
}

.like-btn.liked:hover {
  background: #d63b6a;
  border-color: #d63b6a;
  transform: scale(1.1);
}
</style>