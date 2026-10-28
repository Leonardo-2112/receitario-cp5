import type { Recipe } from "../types/recipe"
import { RecipeCard } from "./RecipeCard"

interface RecipeListProps {
    recipes: Recipe[]
    favorites?: number[]
    onToggleFavorite?: (recipeId: number) => void
}

export function RecipeList({ recipes, favorites = [], onToggleFavorite }: RecipeListProps) {

    return (
        <div className="recipe-grid">
            {
                recipes.map((value) => {
                    return <RecipeCard
                        key={value.id}
                        recipe={value}
                        favorite={favorites.includes(value.id)}
                        onToggleFavorite={onToggleFavorite} />
                })
            }
        </div>
    )

}
