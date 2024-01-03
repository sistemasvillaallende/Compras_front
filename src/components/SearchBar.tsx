import React, { useEffect, useState } from "react"
import Button from "../base-components/Button"
import { FormInput, FormLabel, FormSelect } from "../base-components/Form"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ setPalabra, setParametro }: { setPalabra: (value: string) => void, setParametro: (value: string) => void }) => {

  const buscarPor = (e: any) => {
    e.preventDefault()
    setPalabra(e.target.parametro.value)
    setParametro(e.target.searchFor.value)
  }

  const navegar = useNavigate()

  const limpiar = () => {
    console.log("limpiar")
    setPalabra("")
    setParametro("")
  }

  return (
    <div className="mb-5">
      <div className="flex justify-start items-center">
        <form
          id="formBuscar"
          className="ml-1 flex flex-col justify-start items-center gap-2"
          onSubmit={buscarPor}
        >
          <div className="flex">
            <div className="relative hidden sm:block">
              <FormLabel htmlFor="vertical-form-1">Buscar por</FormLabel>
              <FormSelect
                className="ml-3 sm:mr-2 w-100"
                id="searchFor"
              >
                <option value="">seleccionar</option>
                <option value="estado">Estado</option>
                <option value="area">Área</option>
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

            <Button variant="soft-primary" className="h-10 mx-3" onClick={limpiar}>
              Limpiar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
