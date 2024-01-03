import React, { useEffect } from "react"
import Table from "../base-components/Table"
import Button from "../base-components/Button"
import Lucide from "../base-components/Lucide"

interface TableProps {
  fields: any
  data: any
  handleClick: Function
}

const convertirFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
}

const TableConstructor = ({ data, handleClick }: TableProps) => {

  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Td>
            #
          </Table.Td>
          <Table.Td>
            Fecha
          </Table.Td>
          <Table.Td>
            Área
          </Table.Td>
          <Table.Td>
            Estado
          </Table.Td>
          <Table.Td className="text-right">
            Acciones
          </Table.Td>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.map((row: any, idx: number) => {
          return (
            <Table.Tr className="bg-white" key={idx}>
              <Table.Td>
                {row.id}
              </Table.Td>
              <Table.Td>
                {convertirFecha(row.fecha)}
              </Table.Td>
              <Table.Td>
                {row.area}
              </Table.Td>
              <Table.Td>
                {row.estado}
              </Table.Td>
              <Table.Td className="text-right">
                <Button
                  variant="soft-primary"
                  className="mb-2 mr-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(row)}
                >
                  <Lucide icon="Eye" className="w-5 h-5" />
                </Button>
              </Table.Td>
            </Table.Tr>
          )
        })}
      </Table.Tbody>
    </Table>
  )
}

export default TableConstructor
