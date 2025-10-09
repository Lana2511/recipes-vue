import { createRouter, createWebHistory } from 'vue-router'
import RecipesList from '../components/RecipesList.vue'
import RecipeInfo from '../components/RecipeInfo.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: RecipesList
    },

    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: RecipeInfo,
        props: route => ({ recipeId: route.params.id })
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router