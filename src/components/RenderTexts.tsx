import { useEffect, useState } from "react"
import Table from "../base-components/Table"
import { convertirFecha } from "../utils/helper"

const RenderTexts = ({ data, title, bgSlate }: any) => {
  const [montoTotal, setMontoTotal] = useState(0)
  const renderBoolean = (data: boolean) => {
    return data ? "Si" : "No"
  }


  useEffect(() => {
    if (data) {
      const total = data?.items?.reduce((acc: number, item: any) => {
        return acc + item.precio * item.cantidad
      }, 0)
      setMontoTotal(total)
    }
  }, [data])

  return (
    <div className="ml-4">
      <div className={`p-5 mintro-y`}>
        {data?.id && (
          <div className="flex flex-wrap justify-start">
            <div className="w-auto mr-10">
              <p><strong>Fecha:</strong> {data.fecha}</p>
              <p><strong>Estado:</strong> {data.estado}</p>
              <p><strong>Nota:</strong> {data.nota}</p>
            </div>
            <div className="w-auto">
              <p><strong>Usuario:</strong> {data.usuario}</p>
              <p><strong>Área:</strong> {data.area}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        {data?.items && (
          <div className={`flex-auto mr-3 bg-gray-200 p-2`}>
            <strong>Lista de Requerimientos</strong>
            <div className="w-full">
              <Table striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="whitespace-nowrap">#</Table.Th>
                    <Table.Th className="whitespace-nowrap">
                      Cant.
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap">
                      Insumo
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">
                      Precio Unit.
                    </Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">
                      Total
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {data.items.map((item: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>{item.id}</Table.Td>
                      <Table.Td>{item.cantidad}</Table.Td>
                      <Table.Td>{item.nombreInsumo}</Table.Td>
                      <Table.Td className="text-right">{item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Table.Td>
                      <Table.Td className="text-right">{(item.precio * item.cantidad).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Table.Td>
                    </Table.Tr>
                  ))}
                  <Table.Tr>
                    <Table.Td colSpan={4} className="text-right">
                      <strong>TOTAL</strong>
                    </Table.Td>
                    <Table.Td className="text-right">
                      <strong>{montoTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</strong>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>
          </div>
        )}
        {data?.items && (
          <div className={`flex-1`}>
            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <Table striped>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap">Fecha</Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        Historial
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {data.historia.map((historia: any, index: number) => (
                      <Table.Tr key={index}>
                        <Table.Td>{convertirFecha(historia.fecha)}</Table.Td>
                        <Table.Td>{historia.evento}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RenderTexts
