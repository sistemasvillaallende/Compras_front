import { useState, useContext, createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import menuIcon from "../assets/IconoMenu.svg"
import { capitalizeFirstLetter } from "../utils/helper"
import { setSecureItem } from "../modules/secureStorage"
import { User } from "../interfaces/User"


type UserContextType = {
  user: User | undefined
  error: string | null
  menuIcon: string
  setUser: (user: User) => void
  handleLogin: (username: string, password: string) => void
  handleLogout: () => void
}

const userContext = createContext<UserContextType>({
  user: undefined,
  error: null,
  menuIcon: "",
  setUser: () => { },
  handleLogin: () => { },
  handleLogout: () => { },
})

export function useUserContext() {
  return useContext(userContext)
}

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()



  const handleLogin = async (username: any, password: any) => {
    setError(null)
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_USER}/Login/ValidaUsuarioConOficina`,
        {
          params: {
            user: username,
            password: password,
          },
        }
      )

      if (response?.statusText === "OK") {
        const userData = response?.data
        const token = "token generado por react"
        setUser({
          nombre: capitalizeFirstLetter(userData?.nombre_completo?.split(" ")[0]) ?? "",
          apellido: capitalizeFirstLetter(userData?.nombre_completo?.split(" ")[1]) ?? "",
          email: userData?.email,
          userName: userData?.nombre,
          cuit: userData?.cuit,
          administrador: userData?.administrador,
          cod_oficina: userData?.cod_oficina,
          cod_usuario: userData?.cod_usuario,
          nombre_oficina: userData?.nombre_oficina,
          token: token,
        })
      } else {
        setError("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      console.error("Error al validar el usuario:", error)
      setError("Usuario o contraseña incorrectos")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogeado")
    setUser(undefined)
    navigate("/")
  }

  useEffect(() => {
    if (user) {
      setSecureItem("usuarioLogeado", user)
      navigate("/")
    }
  }, [user])

  return (
    <userContext.Provider
      value={{ user, error, menuIcon, setUser, handleLogin, handleLogout }}
    >
      {children}
    </userContext.Provider >
  )
}
