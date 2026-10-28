import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";
import { getRecipes } from "../services/recipes";

interface useRecipesResult {
    recipes: Recipe[]
    cuisines: string[]
    loading: boolean
    error: string
}

export function useRecipes(): useRecipesResult {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getRecipes().then((data) => {
            setRecipes(data)
        }).catch((err: Error) => {
            setError(err.message)
        }).finally(() => setLoading(false))

    }, [])

    // Culinárias montadas a partir dos dados da API
    const cuisines = ['all', ...[...new Set(recipes.map((recipe) => recipe.cuisine))].sort()]

    return {
        recipes, loading, cuisines, error
    }

}
