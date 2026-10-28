import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"
import { MainLayout } from "./layouts/MainLayout"

import "./index.css"

const CatalogPage = lazy(() => import('./pages/CatalogPage').then(
  (module) => ({ default: module.CatalogPage })))

const RecipePage = lazy(() => import('./pages/RecipePage').then(
  (module) => ({ default: module.RecipePage })))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<CatalogPage />} />
          <Route path="/receitas/:id" element={<RecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App