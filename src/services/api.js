import axios from 'axios'

const API_URL = 'https://dummyjson.com/recipes'

export async function getRecipes() {
    const response = await axios.get(API_URL)
    return response.data.recipes
}

export async function getRecipeById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}
