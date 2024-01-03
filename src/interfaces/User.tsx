export interface User {
  nombre: string
  apellido: string
  email: string
  userName: string
  cuit: string | null
  nombre_oficina: string
  cod_oficina: number
  cod_usuario: string
  administrador: boolean
  img?: string
  token: string
}