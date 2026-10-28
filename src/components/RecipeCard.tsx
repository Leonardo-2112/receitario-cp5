import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import type { Recipe } from "../types/recipe"
import { formatTime } from "../utils/formatTime"

interface RecipeCardProps {
    recipe: Recipe
    favorite?: boolean
    // Se vier, o card mostra o coração (catálogo)
    onToggleFavorite?: (recipeId: number) => void
}

export function RecipeCard({ recipe, favorite = false, onToggleFavorite }: RecipeCardProps) {

    // Tempo total calculado no front
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

    return (
        <section className="card group relative flex flex-col p-4 transition hover:border-orange-300 hover:shadow-lg">

            <Link to={`/receitas/${recipe.id}`} className="flex-1">

                <div className="mb-4 aspect-4/3 w-full overflow-hidden rounded-xl bg-stone-100">
                    <img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={recipe.image} alt={recipe.name} />
                </div>

                <h3 className="text-base font-medium leading-snug sm:text-lg">{recipe.name}</h3>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
                    <span className="text-sm text-orange-700">{recipe.cuisine}</span>
                    <span className="font-mono text-sm font-semibold">{formatTime(totalTime)}</span>
                </div>

            </Link>

            {onToggleFavorite && (
                <button
                    className="absolute right-7 top-7 rounded-full bg-white/90 p-2 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    aria-label={favorite ? "Remover das favoritas" : "Favoritar"}
                    aria-pressed={favorite}
                    onClick={() => onToggleFavorite(recipe.id)}>
                    <Heart size={20} className={favorite ? "fill-red-500 text-red-500" : "text-neutral-500"} />
                </button>
            )}

        </section>
    )
}
