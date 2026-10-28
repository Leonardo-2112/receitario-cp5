import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"
import { MainLayout } from "./layouts/MainLayout"

import "./index.css"

const CatalogPage = lazy(() => import('./pages/CatalogPage').then(
  (module) => ({ default: module.CatalogPage })))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<CatalogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App