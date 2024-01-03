import { useParams, useNavigate } from "react-router-dom"
import TableConstructor from "../../components/TableConstructor"
import SearchBar from "../../components/SearchBar"
import { useComprasContext } from "../../context/ComprasProviders"
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const fields = [
  { name: "#", frontName: "id" },
  { name: "fecha", frontName: "Llaves" },
  { name: "Usuario", frontName: "ID Usuario" },
  { name: "Area", frontName: "area" },
  { name: "estado", frontName: "Estado" }
];

const Requerimientos = () => {
  const navigate = useNavigate()
  const [palabra, setPalabra] = useState("")
  const [parametro, setParametro] = useState("")

  const { requerimientos } = useComprasContext()
  const [requerimientosFiltrados, setRequerimientosFiltrados] = useState<any[]>([])

  useEffect(() => {
    setRequerimientosFiltrados(requerimientos || [])
  }, [requerimientos])

  const handleNuevaTasa = () => {
    navigate(`/nuevaTasa`)
  }

  const handleClick = (requerimiento: any) => {
    navigate(`/ver/${requerimiento.id}`)
  }

  const filtrarRequerimientos = (palabra: string, parametro: string) => {
    if (requerimientos) {
      setRequerimientosFiltrados(requerimientos.filter((requerimiento: any) => {
        return requerimiento[parametro].toLowerCase().includes(palabra.toLowerCase())
      }));
    }
  };

  useEffect(() => {
    if (palabra === "" && parametro === "" && requerimientos) {
      setRequerimientosFiltrados(requerimientos);
    }
  }, [palabra, parametro]);

  return (
    <>
      <div className="intro-y flex flex-col h-full">
        <SearchBar setPalabra={setPalabra} setParametro={setParametro} />
        <div className="conScroll h-2/5">
          {requerimientos && requerimientos.length > 0 && (
            <TableConstructor
              fields={fields}
              data={requerimientosFiltrados}
              handleClick={handleClick}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Requerimientos
