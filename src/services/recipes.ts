import type { Recipe } from "../types/recipe";
import type { RecipesResponse } from "../types/recipesResponse";

const API = 'https://dummyjson.com'

// limit=0 traz as 50 receitas (sem ele a API devolve só 30)
export function getRecipes(): Promise<Recipe[]> {
    const response = fetch(`${API}/recipes?limit=0`)
        .then((data) => {
            if (!data.ok) {
                throw new Error('Não foi possível carregar as receitas')
            }
            return data.json() as Promise<RecipesResponse>
        })
        .then((data) => data.recipes)

    return response
}

// Devolve null quando a receita não existe (404)
export function getRecipeById(id: number): Promise<Recipe | null> {
    const response = fetch(`${API}/recipes/${id}`)
        .then((data) => {
            if (data.status === 404) {
                return null
            }
            if (!data.ok) {
                throw new Error('Não foi possível carregar a receita')
            }
            return data.json() as Promise<Recipe>
        })

    return response
}
