import React, { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
//Paginas
import Login from "../pages/Users/Login"
import NotFound from "../pages/Errors/NotFound "
//Requerimientos
import Requerimientos from "../pages/Requerimientos/Requerimientos"
import VerRequerimiento from "../pages/Requerimientos/VerRequerimiento"
import EditarRequerimiento from "../pages/Requerimientos/EditarRequerimiento"
import NuevoRequerimiento from "../pages/Requerimientos/NuevoRequerimiento"
//Insumos
import Insumos from "../pages/Insumos/Insumos"
//layouts
import TopMenu from "../layouts/TopMenu"
//Context
import { UserProvider } from "../context/UserProvider"
import { ComprasProvider } from "../context/ComprasProviders"

const Router = () => {
  const usuarioLogeado = localStorage.getItem("usuarioLogeado")
  const navigate = useNavigate()

  return (
    <UserProvider>
      <ComprasProvider>
        {!usuarioLogeado ? (
          <Routes>
            <Route path="/*" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<TopMenu />}>
              <Route path="/" element={<Requerimientos />} />
              <Route path="/ver/:id" element={<VerRequerimiento />} />
              <Route path="/editar/:id" element={<EditarRequerimiento />} />
              <Route path="/nuevo" element={<NuevoRequerimiento />} />
              <Route path="/insumos/" element={<Insumos />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        )}
      </ComprasProvider>
    </UserProvider>
  )
}

export default Router
