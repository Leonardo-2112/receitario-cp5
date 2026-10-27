import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { RecipeGridSkeleton } from "../components/RecipeGridSkeleton";

export function MainLayout() {

    return(
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<RecipeGridSkeleton />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>

            </main>

            <footer className="border-t border-stone-200 bg-stone-50/90 py-6 text-center text-xs text-neutral-500">Receitário - Projeto Acadêmico</footer>

        </div>
    )

}
