import { useParams, useNavigate } from "react-router-dom"
import TableConstructor from "../../components/TableConstructor"
import SearchBar from "../../components/SearchBar"
import { useComprasContext } from "../../context/ComprasProviders"
import { useEffect } from "react";

const fields = [
  { name: "#", frontName: "id" },
  { name: "fecha", frontName: "Llaves" },
  { name: "Usuario", frontName: "ID Usuario" },
  { name: "Area", frontName: "area" },
  { name: "estado", frontName: "Estado" }
];

const Requerimientos = () => {
  const navigate = useNavigate()
  const { requerimientos } = useComprasContext()
  const handleNuevaTasa = () => {
    navigate(`/nuevaTasa`)
  }

  const handleClick = (requerimiento: any) => {
    navigate(`/ver/${requerimiento.id}`)
  }

  return (
    <>
      <div className="intro-y flex flex-col h-full">
        <SearchBar handleNuevaTasa={handleNuevaTasa} />
        <div className="conScroll h-2/5">
          {requerimientos && requerimientos.length > 0 && (
            <TableConstructor
              fields={fields}
              data={requerimientos}
              handleClick={handleClick}
            />
          )}
        </div>
      </div>
      <div className="absolute right-0 -bottom-16">

      </div>
    </>
  )
}

export default Requerimientos
