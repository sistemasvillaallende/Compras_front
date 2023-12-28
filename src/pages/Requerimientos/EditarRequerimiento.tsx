import { useParams } from "react-router-dom"
import { useComprasContext } from "../../context/ComprasProviders"
import { useEffect, useState } from "react"
import { Requerimiento, Item } from "../../interfaces/Compras"
import {
  FormSelect,
  FormInput,
  FormLabel,
  FormTextarea,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import Swal from "sweetalert2";
import { convertirFecha } from "../../utils/helper";

function EditarRequerimiento() {
  const { id } = useParams()
  const { requerimientos } = useComprasContext()
  const [requerimiento, setRequerimiento] = useState<Requerimiento | undefined>()
  const [listaDeRequerimientos, setListaDeRequerimientos] = useState<Item[]>([])
  const [total, setTotal] = useState(0)


  useEffect(() => {
    if (requerimientos) {
      const requerimiento = requerimientos.find((requerimiento: Requerimiento) => requerimiento.id === parseInt(id as string))
      setRequerimiento(requerimiento)
      console.log("REQUERIMIENTO", requerimiento)
    }
    if (requerimiento?.items) {
      setListaDeRequerimientos(requerimiento.items)
    }
    modificarTotal()
  }, [requerimiento])

  useEffect(() => {
    modificarTotal();
  }, [listaDeRequerimientos]);

  const handleDeleteItem = (id: number) => {
    const newList = listaDeRequerimientos.filter((item: Item) => item.id !== id)
    setListaDeRequerimientos(newList)
  }

  const handleGuardar = () => {
    Swal.fire({
      title: `¿Deseas guardar los cambios?`,
      text: "No podrás revertir esta acción",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#27a3cf',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        history.back()
      }
    })
  }

  const handleAgregarRequerimiento = () => {
    setListaDeRequerimientos([...listaDeRequerimientos, {
      id: Math.random(),
      nombreInsumo: "Insumo",
      cantidad: 0,
      precio: 0
    }])
  }

  const modificarTotal = () => {
    const total = listaDeRequerimientos.reduce((acc: number, item: Item) => {
      return acc + item.precio * item.cantidad
    }, 0)
    setTotal(total)
  }

  const handleModificarItem = (index: number, campo: string, valor: any) => {
    const newList = listaDeRequerimientos.map((item, i) => {
      if (i === index) {
        return { ...item, [campo]: valor };
      }
      return item;
    });
    setListaDeRequerimientos(newList);
    modificarTotal()
  };

  const listaDeInsumos = [
    {
      id: 1,
      nombre: "ladrillo",
      precio: 100
    },
    {
      id: 2,
      nombre: "cemento",
      precio: 100
    },
    {
      id: 3,
      nombre: "papel",
      precio: 50
    },
    {
      id: 4,
      nombre: "pluma",
      precio: 120
    },
    {
      id: 5,
      nombre: "cartón",
      precio: 200
    },
    {
      id: 6,
      nombre: "cinta adhesiva",
      precio: 150
    },
    {
      id: 7,
      nombre: "folletos",
      precio: 300
    },
    {
      id: 8,
      nombre: "tarjetas de visita",
      precio: 250
    },
    {
      id: 9,
      nombre: "catálogos",
      precio: 150
    },
    {
      id: 10,
      nombre: "bolígrafos",
      precio: 200
    },
    {
      id: 11,
      nombre: "laptops",
      precio: 500
    },
    {
      id: 12,
      nombre: "monitores",
      precio: 300
    },
    {
      id: 13,
      nombre: "estantes",
      precio: 100
    },
    {
      id: 14,
      nombre: "cajas de almacenamiento",
      precio: 50
    },
    {
      id: 15,
      nombre: "computadoras de alto rendimiento",
      precio: 2000
    },
    {
      id: 16,
      nombre: "sillas ergonómicas",
      precio: 1500
    },
    {
      id: 17,
      nombre: "muestras de prueba",
      precio: 10
    },
    {
      id: 18,
      nombre: "instrumentos de medición",
      precio: 5
    },
    {
      id: 19,
      nombre: "madera",
      precio: 50
    },
    {
      id: 20,
      nombre: "metal",
      precio: 30
    }
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center mt-8 intro-y">
        <h1 className="mr-auto ml-5 mb-3 text-lg font-medium">Editar Requerimiento</h1>
      </div>
      <div className="box py-2">
        <div className="ml-4">
          <div className={`p-5 mintro-y`}>
            {requerimiento?.id && (
              <div className="flex flex-wrap justify-start">
                <div className="w-auto mr-10">
                  <p><strong>Fecha:</strong> {convertirFecha(requerimiento.fecha)}</p>
                </div>
                <div className="w-auto">
                  <p><strong>Usuario:</strong> {requerimiento.usuario}</p>
                  <p><strong>Área:</strong> {requerimiento.area}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="box py-2 bg-gray-200 p-2`">

        <div className="flex">

          <div className="w-1/2 p-4 grid grid-cols-12 gap-2">
            <div className="col-span-4" >
              <FormLabel htmlFor="vertical-form-1">Estado</FormLabel>
              <FormSelect className="w-40" aria-label=".form-select-sm example">
                <option>Pendiente</option>
                <option>Aprobado</option>
                <option>Rechazado</option>
              </FormSelect>
            </div>
            <div className="col-span-4">
              <FormLabel htmlFor="vertical-form-1">Nota</FormLabel>
              <FormTextarea className="w-80" aria-label="default input inline 1" />
            </div>
          </div>

          <div className="w-1/2 p-2">
            <div className="flex">
              <h1 className="mr-auto ml-5 mb-3 text-lg font-medium">Detalles del Requerimiento</h1>
              <Button variant="pending" className="mr-1" onClick={() => handleAgregarRequerimiento()}>
                <Lucide icon="Plus" className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex">
              <div className="w-1/6 p-1 text-center">
                Insumo
              </div>
              <div className="w-1/6 p-1 ml-5 text-center">
                Cantidad
              </div>
              <div className="w-1/6 p-1 ml-5 text-center">
                Precio
              </div>
              <div className="w-1/6 p-1 ml-5 text-center">
                Total
              </div>
            </div>

            {listaDeRequerimientos.map((item: any, index: number) => (
              <div className="flex" key={index}>
                <div className="w-1/5 p-1">
                  <FormSelect
                    className="w-full"
                    aria-label=".form-select-sm example"
                    value={item?.id}
                    onChange={(e) => handleModificarItem(index, "id", e.target.value)}
                  >
                    {listaDeInsumos.map((insumo: any) => (
                      <option key={insumo.id} value={insumo.id}>
                        {insumo.nombre}
                      </option>
                    ))}
                  </FormSelect>

                </div>
                <div className="w-1/5 p-1">
                  <FormInput type="text"
                    className="w-full"
                    aria-label=".form-control-sm example"
                    value={item?.cantidad}
                    onChange={(e) => handleModificarItem(index, "cantidad", e.target.value)}
                  />
                </div>
                <div className="w-1/5 p-1">
                  <FormInput
                    type="text"
                    className="w-full"
                    aria-label=".form-control-sm example"
                    value={item?.precio}
                    onChange={(e) => handleModificarItem(index, "precio", e.target.value)}
                  />
                </div>
                <div className="w-1/5 p-1 text-center mt-3">
                  {(item?.precio * item?.cantidad).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </div>
                <div className="w-1/5 p-1 text-right">
                  <Button
                    variant="warning"
                    className="mr-1"
                    onClick={() => handleDeleteItem(item.id)}>
                    <Lucide icon="Trash" className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex">
              <div className="w-1/6 p-1 text-center">

              </div>
              <div className="w-1/6 p-1 ml-5 text-center">

              </div>
              <div className="w-1/6 p-1 ml-5 text-center">

              </div>
              <div className="w-1/6 p-1 ml-5 text-right">
                {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
              </div>
            </div>

          </div>


        </div>

      </div>
      <div className="box py-2 text-center">
        <Button variant="primary" className="w-32 mb-2 mr-2" onClick={() => handleGuardar()}>
          <Lucide icon="Save" className="w-4 h-4 mr-2" />{" "}
          Guardar
        </Button>
      </div>
    </div>

  )
}

export default EditarRequerimiento
