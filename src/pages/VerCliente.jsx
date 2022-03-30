import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner'

export const VerCliente = () => {
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`

        const respuesta = await window.fetch(url)
        const resultado = await respuesta.json()

        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setCargando(!cargando)
    }

    obtenerClientesAPI()
  }, [])

  return (
    cargando
      ? <Spinner />
      : Object.keys(cliente).length === 0
        ? <p>No hay resultados</p>
        : (
          <div>
            <h1 className=' font-black text-4xl text-blue-900'>
              Ver Cliente: {cliente.nombre}
            </h1>

            <p className=' mt-3'>Información del cliente</p>

            <p className=' text-4xl text-gray-600 mt-10'>
              <span className=' uppercase font-bold text-gray-800'>Cliente: </span>{cliente.nombre}
            </p>

            {cliente.telefono && (
              <p className=' text-2xl text-gray-600 mt-4'>
                <span className=' uppercase font-bold text-gray-800'>Teléfono: </span>{cliente.telefono}
              </p>
            )}

            <p className=' text-2xl text-gray-600 mt-4'>
              <span className=' uppercase font-bold text-gray-800'>Email: </span>{cliente.email}
            </p>

            <p className=' text-2xl text-gray-600 mt-4'>
              <span className=' uppercase font-bold text-gray-800'>Empresa: </span>{cliente.empresa}
            </p>

            {cliente.notas && (
              <p className=' text-2xl text-gray-600 mt-4'>
                <span className=' uppercase font-bold text-gray-800'>notas: </span>{cliente.notas}
              </p>
            )}
          </div>
          )
  )
}
