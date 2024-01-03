import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext, useEffect, useState
} from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Requerimiento } from "../interfaces/Compras"
import listaDeRequerimientos from "../../data/requerimientos.json"
import { set } from "lodash"

type ComprasContextType = {
  requerimientos: Requerimiento[] | null
}

const ComprasContext = createContext<ComprasContextType>({
  requerimientos: null,
})

export function useComprasContext() {
  return useContext(ComprasContext)
}



export function ComprasProvider({ children }: any) {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[] | null>(null)

  useEffect(() => {
    obtenerRequerimientos()
  }, [])

  const obtenerRequerimientos = async () => {
    // obtenerlos desde el archivo json listaDeRequerimientos
    setRequerimientos(listaDeRequerimientos)
    //modificar cuando este terminado el end-point
  }

  return (
    <ComprasContext.Provider
      value={{
        requerimientos,
      }}
    >
      {children}
    </ComprasContext.Provider>
  )
}
