import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { RecipeList } from "../components/RecipeList";
import { RecipeGridSkeleton } from "../components/RecipeGridSkeleton";
import { useRecipes } from "../hooks/useRecipes";

export function CatalogPage() {
    const [query, setQuery] = useState('')

    const [cuisine, setCuisine] = useState('all')

    // Favoritos vivem só nesta página (ids das receitas favoritadas)
    const [favorites, setFavorites] = useState<number[]>([])

    const { recipes, loading, cuisines, error } = useRecipes()

    function toggleFavorite(recipeId: number) {
        setFavorites((current) => current.includes(recipeId)
            ? current.filter((id) => id !== recipeId)
            : [...current, recipeId])
    }

    const filtered = useMemo(() => recipes.filter((recipe) => {

        const searchCuisine = cuisine === 'all' || recipe.cuisine === cuisine
        const searchWords = recipe.name.toLowerCase().includes(query.toLowerCase())

        return searchCuisine && searchWords

    }), [recipes, cuisine, query])

    return (
        <section>

            <div className="mb-6 flex flex-wrap items-end justify-center gap-4 text-center sm:justify-between sm:text-left">

                <div>
                    <h1 className="font-display text-3xl font-bold">Catálogo</h1>

                    <p className="text-base text-neutral-600">
                        {loading ? "Carregando receitas..." : `${filtered.length} receitas disponíveis`}
                    </p>

                    <p className="mt-1 text-base font-medium text-red-600">
                        {favorites.length === 1 ? '1 favorita' : `${favorites.length} favoritas`}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">

                    <div className="relative">
                        <Search size={18} className="absolute left-3.5 top-3 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar receita..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="field pl-10"
                        />
                    </div>

                    <select
                        name="cuisine-list"
                        id="cuisine"
                        value={cuisine}
                        onChange={(event) => setCuisine(event.target.value)}
                        className="field"
                    >
                        {
                            cuisines.map((item) => {
                                return <option key={item} value={item}>{item === 'all' ? 'Todas as culinárias' : item}</option>
                            })
                        }
                    </select>

                </div>

            </div>

            {
                loading ?
                    <RecipeGridSkeleton /> :

                error ?
                    <p className="py-20 text-center text-sm text-red-600">{error}</p> :

                filtered.length === 0 ?
                    <p className="py-20 text-center text-sm text-neutral-500">Nenhuma receita encontrada</p> :

                    <RecipeList
                        recipes={filtered}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                    />
            }

        </section>
    )
}
