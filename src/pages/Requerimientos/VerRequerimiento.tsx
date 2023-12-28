import RenderTexts from "../../components/RenderTexts"
import { useParams } from "react-router-dom"
import { useComprasContext } from "../../context/ComprasProviders"
import { useEffect, useState } from "react"
import { Requerimiento } from "../../interfaces/Compras"

function VerRequerimiento() {
  const { id } = useParams()
  const { requerimientos } = useComprasContext()
  const [requerimiento, setRequerimiento] = useState<Requerimiento | undefined>()


  useEffect(() => {
    console.log("ID", id)
    if (requerimientos) {
      console.log("REQUERIMIENTOS", requerimientos)
      const requerimiento = requerimientos.find((requerimiento: Requerimiento) => requerimiento.id === parseInt(id as string))
      setRequerimiento(requerimiento)
    }
  }, [requerimiento])


  return (
    <form className="mb-10">
      <div className="flex items-center mt-8 intro-y">
        <h1 className="mr-auto ml-5 mb-3 text-lg font-medium">Requerimiento de Insumos</h1>
      </div>
      <div className="box py-2">
        <RenderTexts
          data={requerimiento}
          bgSlate
        />
      </div>
    </form>
  )
}

export default VerRequerimiento
