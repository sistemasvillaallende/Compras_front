import React, { useState } from "react"
import Button from "../base-components/Button"
import { FormInput, FormLabel, FormSelect } from "../base-components/Form"
import Swal from "sweetalert2"
import axios from "axios"

const SearchBar = ({
  handleNuevaTasa,
}: {
  handleNuevaTasa: React.MouseEventHandler<HTMLButtonElement>
}) => {
  const [error, setError] = useState<string | null>(null)
  const [paginaActual, setPaginaActual] = useState(1)

  return (
    <div className="mb-5">
      <div className="flex justify-start items-center">
        <form
          id="formBuscar"
          className="ml-1 flex flex-col justify-start items-center gap-2"
        >
          <div className="flex">
            <div className="relative hidden sm:block">
              <FormLabel htmlFor="vertical-form-1">Buscar por</FormLabel>
              <FormSelect
                className="ml-3 sm:mr-2 w-100"
                name="buscarPor"
                id="buscarPor"
              >
                <option value="titular">Número</option>
                <option value="cuil">Secretaría</option>
                <option value="denominacion">Oficina</option>
              </FormSelect>
              <FormLabel htmlFor="vertical-form-1">Estado</FormLabel>
              <FormSelect
                className="ml-3 sm:mr-2 w-100"
                name="activos"
                id="activos"
              >
                <option value="1">pendiente</option>
                <option value="0">aprobado</option>
                <option value="2">rechazado</option>
              </FormSelect>
              <FormInput
                type="text"
                className="mr-5 mt-2 border-transparent w-56 shadow-none rounded-5 pr-8"
                placeholder="Buscar..."
                name="parametro"
                id="searchParametro"
              />
            </div>
            <Button variant="primary" className="h-10 mx-3">
              Buscar
            </Button>

            <Button variant="soft-primary" className="h-10 mx-3">
              Limpiar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
