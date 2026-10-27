import { RecipeCardSkeleton } from "./RecipeCardSkeleton";

export function RecipeGridSkeleton(){

    return(

        <div className="recipe-grid">
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
        </div>

    )

}
