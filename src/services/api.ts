import axios from 'axios'

const API_URL = 'https://dummyjson.com/recipes'

export interface RecipeInfo {
    id: number
    name: string
    ingredients: string[]
    instructions: string[]
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    difficulty: string
    cuisine: string
    caloriesPerServing: number
    tags: string[]
    userId: number
    image: string
    rating: number
    reviewCount: number
    mealType: string[]
}

export interface Recipes {
    recipes: RecipeInfo[]
}

export async function getRecipes(): Promise<RecipeInfo[]> {
    const response = await axios.get<Recipes>(API_URL)
    return response.data.recipes
}

export async function getRecipeById(id: Number): Promise<RecipeInfo> {
    const response = await axios.get<RecipeInfo>(`${API_URL}/${id}`)
    return response.data
}
