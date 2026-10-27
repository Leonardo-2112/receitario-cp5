import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"

import "./index.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

         

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App