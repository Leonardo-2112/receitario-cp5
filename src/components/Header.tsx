import { Link } from "react-router-dom"

export function Header() {

    return (
        <header className="sticky top-0 z-10 border-b border-stone-200 shadow-xl bg-stone-50/90 backdrop-blur-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

                {/* O logo leva ao catálogo */}
                <Link to='/' className="flex items-center text-2xl font-bold">
                    Receit<span className="text-orange-600">ário</span>
                </Link>

            </div>

        </header>
    )
}
