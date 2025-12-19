import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useLikesStore = defineStore('favourites', () => {
    const favourites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

    const toggleFavourite = (recipe) => {
        const exists = favourites.value.find(r => r.id === recipe.id)
        if (exists) {
            favourites.value = favourites.value.filter(r => r.id !== recipe.id)
        } else {
            favourites.value.push(recipe)
        }
    }

    const isFavourite = (id) => {
        return favourites.value.some(r => r.id === id)
    }

    // Сохраняем в localStorage при каждом изменении
    watch(
        favourites,
        (newValue) => {
            localStorage.setItem('favorites', JSON.stringify(newValue))
        },
        { deep: true }
    )

    return { favourites, toggleFavourite, isFavourite }
})
