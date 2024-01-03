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
import insumos from "../../../data/insumos.json";
import axios from "axios";
import Select from 'react-select';

function EditarRequerimiento() {
  const { id } = useParams()
  const { requerimientos } = useComprasContext()
  const [requerimiento, setRequerimiento] = useState<Requerimiento | undefined>()
  const [listaDeRequerimientos, setListaDeRequerimientos] = useState<Item[]>([])
  const [total, setTotal] = useState(0)
  const [listaDeInsumos, setListaDeInsumos] = useState<any[]>([])
  const opcionesInsumos = listaDeInsumos.map(insumo => ({ value: insumo.id, label: insumo.nombre }));

  useEffect(() => {
    if (requerimientos) {
      const requerimiento = requerimientos.find((requerimiento: Requerimiento) => requerimiento.id === parseInt(id as string))
      setRequerimiento(requerimiento)
      if (requerimiento?.items) {
        setListaDeRequerimientos(requerimiento.items)
      }
    }
    modificarTotal()
  }, [])

  useEffect(() => {
    modificarTotal();
    obtenerInsumos();
  }, [listaDeRequerimientos]);

  const handleDeleteItem = (id: number) => {
    const newList = listaDeRequerimientos.filter((item: Item) => item.id !== id)
    setListaDeRequerimientos(newList)
  }

  const modificarEstado = (estado: string) => {
    setRequerimiento(prevRequerimiento => {
      if (prevRequerimiento) {
        return { ...prevRequerimiento, estado };
      }
      return prevRequerimiento;
    });
  };

  const modificarNota = (nota: string) => {
    setRequerimiento(prevRequerimiento => {
      if (prevRequerimiento) {
        return { ...prevRequerimiento, nota };
      }
      return prevRequerimiento;
    }
    );
  }


  const handleAgregarRequerimiento = (e: any) => {
    const insumoSeleccionado = listaDeInsumos.find((insumo: any) => insumo.id === e.target.insumo.value)

    if (insumoSeleccionado) { // Verificar si se encontró un insumo
      const newItem = {
        id: insumoSeleccionado.id,
        nombreInsumo: insumoSeleccionado.nombre,
        cantidad: 1,
        precio: insumoSeleccionado.precio
      }
      setListaDeRequerimientos(prevLista => [...prevLista, newItem])
    } else {
      console.error("No se encontró un insumo con el nombre proporcionado.");
    }

    e.target.insumo.value = ""
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

  const obtenerInsumos = async () => {
    //obtener los insumos del archivo json
    setListaDeInsumos(insumos)
  }

  const agregarRequerimientos = () => {
    setRequerimiento(prevRequerimiento => {
      if (prevRequerimiento) {
        return { ...prevRequerimiento, items: listaDeRequerimientos };
      }
      return prevRequerimiento;
    }
    );
  }

  const modificarHistorial = () => {
    const fecha = new Date();
    const fechaYHora = fecha.toLocaleString();
    const historia = {
      fecha: fechaYHora,
      evento: "Editado por el usuario"
    }
    setRequerimiento(prevRequerimiento => {
      if (prevRequerimiento) {
        return { ...prevRequerimiento, historia: [...prevRequerimiento.historia, historia] };
      }
      return prevRequerimiento;
    }
    );
  }

  const handleGuardar = async () => {
    agregarRequerimientos()
    modificarHistorial()
    console.log(requerimiento)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_API_COMPRAS}Requerimiento/nuevoRequerimiento/`, requerimiento);

      if (response.status === 200) {
        Swal.fire({
          title: "Guardado exitoso",
          icon: "success",
        }).then(() => {
          history.back();
        });
      } else {
        Swal.fire({
          title: "Error al guardar",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al guardar el requerimiento:", error);
      Swal.fire({
        title: "Error al guardar",
        icon: "error",
      });
    }
  };

  const handleSelectChange = (opcion: any) => {
    const evento = {
      target: {
        insumo: {
          value: opcion.value
        }
      }
    };
    handleAgregarRequerimiento(evento);
  };

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
              <FormSelect className="w-40" aria-label=".form-select-sm example" onChange={(e) => modificarEstado(e.target.value)}>
                <option>Pendiente</option>
                <option>Aprobado</option>
                <option>Rechazado</option>
              </FormSelect>
            </div>
            <div className="col-span-4">
              <FormLabel htmlFor="vertical-form-1">Nota</FormLabel>
              <FormTextarea
                className="w-80"
                aria-label="default input inline 1"
                value={requerimiento?.nota}
                onChange={(e) => { modificarNota(e.target.value) }}
              />
            </div>
          </div>

          <div className="w-1/2 p-2">
            <div className="flex">
              <h1 className="mr-auto mb-3 text-lg font-medium">Detalles</h1>
              <form className="flex" onSubmit={handleAgregarRequerimiento}>
                <Select
                  className="w-80 mr-2"
                  options={opcionesInsumos}
                  onChange={handleSelectChange}
                  placeholder="Buscar insumo..."
                />
              </form>
            </div>

            <div className="flex">
              <div className="w-1/6 p-1 ml-5 text-center">
                Cantidad
              </div>
              <div className="w-1/6 p-1 text-center">
                Insumo
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
                  <FormInput type="text"
                    className="w-full"
                    aria-label=".form-control-sm example"
                    value={item?.cantidad}
                    onChange={(e) => handleModificarItem(index, "cantidad", e.target.value)}
                  />
                </div>
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
    </div >

  )
}

export default EditarRequerimiento
