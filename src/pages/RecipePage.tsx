import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import type { Recipe } from "../types/recipe"
import { getRecipeById } from "../services/recipes"
import { formatTime } from "../utils/formatTime"

export function RecipePage(){

    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const {id} = useParams()
    const [currentId, setCurrentId] = useState(id)

    // Ao trocar de receita, limpa o estado antes do fetch para não mostrar dados antigos
    if (id !== currentId) {
        setCurrentId(id)
        setLoading(true)
        setError('')
        setRecipe(null)
    }

    useEffect(() => {

        if(!id) return

        getRecipeById(Number(id))
            .then((data) => {
                setRecipe(data)
                setError('')
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))

    }, [id])

    const backLink = (
        <Link to="/" className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700">
            <ArrowLeft size={16}/> Voltar ao Catálogo
        </Link>
    )

    if (loading) {
        return <p className="py-20 text-center text-sm text-neutral-500">Carregando receita...</p>
    }

    if (error) {
        return (
            <section>
                {backLink}
                <p className="py-20 text-center text-sm text-red-600">{error}</p>
            </section>
        )
    }

    if (!recipe){
        return (
            <section>
                {backLink}
                <p className="py-20 text-center text-sm text-neutral-500">Receita não encontrada</p>
            </section>
        )
    }

    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

    return (
        <section>
            {backLink}

            <div className="card border-2 text-center grid gap-6 p-5 sm:grid-cols-2">

                <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-lg bg-stone-50">
                    <img className="h-full w-full object-cover" src={recipe.image} alt={recipe.name} />
                </div>

                <div className="flex flex-col justify-between">
                    
                    <div className="mt-10">
                        <span className="text-xl font-display font-bold uppercase text-orange-600">{recipe.cuisine}</span>
                        <h1 className="mb-3 mt-2 font-display text-3xl text-center font-bold">{recipe.name}</h1>
                    </div>

                    <dl className="grid grid-cols-3 gap-2 text-sm mb-20">
                        <div>
                            <dt className="text-xl text-neutral-500 font-bold">Preparo</dt>
                            <dd className="text-xl font-semibold">{formatTime(recipe.prepTimeMinutes)}</dd>
                        </div>
                        <div>
                            <dt className="text-xl text-neutral-500 font-bold">Cozimento</dt>
                            <dd className="text-xl font-semibold">{formatTime(recipe.cookTimeMinutes)}</dd>
                        </div>
                        <div>
                            <dt className="text-xl text-neutral-500 font-bold">Total</dt>
                            <dd className="text-xl font-semibold">{formatTime(totalTime)}</dd>
                        </div>
                    </dl>
                </div>

            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">

                <div className="card border-8 p-5">
                    <h2 className="mb-5 font-display text-lg font-bold text-center">Ingredientes</h2>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                        {recipe.ingredients.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                </div>

                <div className="card border-8 p-5">
                    <h2 className="mb-5 font-display text-lg font-bold text-center">Modo de preparo</h2>
                    <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
                        {recipe.instructions.map((step, index) => {
                            return <li key={index}>{step}</li>
                        })}
                    </ol>
                </div>

            </div>
        </section>
    )

}