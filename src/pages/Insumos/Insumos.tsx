import { useEffect, useState } from "react"
import insumos from "../../../data/insumos.json";
import Table from "../../base-components/Table"

function Insumos() {

  const [listaDeInsumos, setListaDeInsumos] = useState<any[]>([])


  useEffect(() => {
    setListaDeInsumos(insumos)
  }, [])


  return (
    <form className="mb-10">
      <div className="flex items-center mt-8 intro-y">
        <h1 className="mr-auto ml-5 mb-3 text-lg font-medium">Insumos</h1>
      </div>
      <div className="box py-2">
        {listaDeInsumos && (
          <div className={`flex-1`}>
            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <Table striped>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap">#</Table.Th>
                      <Table.Th className="whitespace-nowrap">nombre</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">precio</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {listaDeInsumos.map((insumo: any, index: number) => (
                      <Table.Tr key={index}>
                        <Table.Td>{insumo.id}</Table.Td>
                        <Table.Td>{insumo.nombre}</Table.Td>
                        <Table.Td className="text-right">{insumo.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default Insumos
