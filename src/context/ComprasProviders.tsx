import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext, useEffect, useState
} from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Requerimiento } from "../interfaces/Compras"

type ComprasContextType = {
  requerimientos: Requerimiento[] | null
}

const ComprasContext = createContext<ComprasContextType>({
  requerimientos: null,
})

export function useComprasContext() {
  return useContext(ComprasContext)
}



export function ComprasProvider({ children }: any) {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[] | null>(null)

  useEffect(() => {
    setRequerimientos(listaDeRequerimientos)
  }, [])

  return (
    <ComprasContext.Provider
      value={{
        requerimientos,
      }}
    >
      {children}
    </ComprasContext.Provider>
  )
}

//Datos de Pruebas

const listaDeRequerimientos = [
  {
    "id": 1,
    "fecha": "2023-12-12T13:45:33.398Z",
    "usuario": "Román Gómez",
    "area": "Recursos Humanos",
    "nota": "nota1",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-12T13:45:33.398Z",
        "evento": "creacion"
      },
      {
        "fecha": "2023-12-12T13:45:33.398Z",
        "evento": "modificacion"
      },
    ],
    "items": [
      {
        "id": 1,
        "cantidad": 10,
        "precio": 100,
        "nombreInsumo": "ladrillo"
      },
      {
        "id": 2,
        "cantidad": 10,
        "precio": 100,
        "nombreInsumo": "cemento"
      },
    ]
  },
  {
    "id": 2,
    "fecha": "2023-12-13T10:30:45.567Z",
    "usuario": "María Rodríguez",
    "area": "Finanzas",
    "nota": "nueva nota",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-13T10:30:45.567Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 3,
        "cantidad": 5,
        "precio": 50,
        "nombreInsumo": "papel"
      },
      {
        "id": 4,
        "cantidad": 8,
        "precio": 120,
        "nombreInsumo": "pluma"
      },
    ]
  },
  {
    "id": 3,
    "fecha": "2023-12-14T15:20:10.789Z",
    "usuario": "Carlos Pérez",
    "area": "Logística",
    "nota": "requerimiento urgente",
    "estado": "en proceso",
    "historia": [
      {
        "fecha": "2023-12-14T15:20:10.789Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 5,
        "cantidad": 20,
        "precio": 200,
        "nombreInsumo": "cartón"
      },
      {
        "id": 6,
        "cantidad": 15,
        "precio": 150,
        "nombreInsumo": "cinta adhesiva"
      },
    ]
  },
  {
    "id": 4,
    "fecha": "2023-12-15T08:45:22.123Z",
    "usuario": "Laura Martínez",
    "area": "Marketing",
    "nota": "nuevo requerimiento",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-15T08:45:22.123Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 7,
        "cantidad": 30,
        "precio": 300,
        "nombreInsumo": "folletos"
      },
      {
        "id": 8,
        "cantidad": 25,
        "precio": 250,
        "nombreInsumo": "tarjetas de visita"
      },
    ]
  },
  {
    "id": 5,
    "fecha": "2023-12-16T12:10:55.234Z",
    "usuario": "Ana Sánchez",
    "area": "Ventas",
    "nota": "se necesita con urgencia",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-16T12:10:55.234Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 9,
        "cantidad": 15,
        "precio": 150,
        "nombreInsumo": "catálogos"
      },
      {
        "id": 10,
        "cantidad": 20,
        "precio": 200,
        "nombreInsumo": "bolígrafos"
      },
    ]
  },
  {
    "id": 6,
    "fecha": "2023-12-17T09:30:40.876Z",
    "usuario": "Juan Torres",
    "area": "Tecnología",
    "nota": "requerimiento de hardware",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-17T09:30:40.876Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 11,
        "cantidad": 5,
        "precio": 500,
        "nombreInsumo": "laptops"
      },
      {
        "id": 12,
        "cantidad": 10,
        "precio": 300,
        "nombreInsumo": "monitores"
      },
    ]
  },
  {
    "id": 7,
    "fecha": "2023-12-18T14:55:18.654Z",
    "usuario": "Elena Gutiérrez",
    "area": "Operaciones",
    "nota": "materiales para el almacén",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-18T14:55:18.654Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 13,
        "cantidad": 50,
        "precio": 100,
        "nombreInsumo": "estantes"
      },
      {
        "id": 14,
        "cantidad": 30,
        "precio": 50,
        "nombreInsumo": "cajas de almacenamiento"
      },
    ]
  },
  {
    "id": 8,
    "fecha": "2023-12-19T11:20:32.567Z",
    "usuario": "Pedro López",
    "area": "Desarrollo",
    "nota": "nuevos equipos de desarrollo",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-19T11:20:32.567Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 15,
        "cantidad": 3,
        "precio": 2000,
        "nombreInsumo": "computadoras de alto rendimiento"
      },
      {
        "id": 16,
        "cantidad": 5,
        "precio": 1500,
        "nombreInsumo": "sillas ergonómicas"
      },
    ]
  },
  {
    "id": 9,
    "fecha": "2023-12-20T08:40:15.789Z",
    "usuario": "Luisa Ramírez",
    "area": "Calidad",
    "nota": "materiales para pruebas",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-20T08:40:15.789Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 17,
        "cantidad": 100,
        "precio": 10,
        "nombreInsumo": "muestras de prueba"
      },
      {
        "id": 18,
        "cantidad": 50,
        "precio": 5,
        "nombreInsumo": "instrumentos de medición"
      },
    ]
  },
  {
    "id": 10,
    "fecha": "2023-12-21T16:15:28.901Z",
    "usuario": "Martín Díaz",
    "area": "Producción",
    "nota": "materia prima para producción",
    "estado": "pendiente",
    "historia": [
      {
        "fecha": "2023-12-21T16:15:28.901Z",
        "evento": "creacion"
      }
    ],
    "items": [
      {
        "id": 19,
        "cantidad": 200,
        "precio": 50,
        "nombreInsumo": "madera"
      },
      {
        "id": 20,
        "cantidad": 150,
        "precio": 30,
        "nombreInsumo": "metal"
      },
    ]
  }
];



