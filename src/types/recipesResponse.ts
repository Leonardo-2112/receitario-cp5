import type { Recipe } from "./recipe";

// A lista da DummyJSON vem dentro de um objeto, não como array direto
export interface RecipesResponse {
    recipes: Recipe[]
    total: number
    skip: number
    limit: number
}
