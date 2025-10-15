import { createRouter, createWebHistory } from 'vue-router'
import RecipesListPage from '../pages/RecipesListPage.vue'
import RecipeInfoPage from '../pages/RecipeInfoPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: RecipesListPage
    },

    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: RecipeInfoPage,
        props: route => ({ recipeId: route.params.id })
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router