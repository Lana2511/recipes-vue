import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RecipesListPage from '../pages/RecipesListPage.vue'
import RecipeInfoPage from '../pages/RecipeInfoPage.vue'
import FavouritesPage from "../pages/FavouritesPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: RecipesListPage
    },

    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: RecipeInfoPage,
        props: route => ({ recipeId: Number(route.params.id) })
    },

    {
        path: '/favourites',
        name: 'Favourites',
        component: FavouritesPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router