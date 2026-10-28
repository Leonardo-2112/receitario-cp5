import { Link } from "react-router-dom";

export function NotFoundPage (){

    return(
    <section className="flex flex-col items-center justify-center text-center py-12">

        <p className="font-display text-5xl font-bold text-stone-500 py-5">Ops...</p>

        <p className="font-display text-9xl font-bold text-stone-300">404</p>

        <h1 className="mb-3 mt-5 font-display text-4xl font-bold">Página não encontrada</h1>

        <p className="mb-8 text-lg text-neutral-500">O endereço digitado não existe no Receitário</p>

        <Link className="btn-primary text-lg px-6 py-3" to="/">Voltar ao Catálogo</Link>

    </section>


    )
}
