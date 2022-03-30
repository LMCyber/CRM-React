import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../components/Formulario'

export const EditarClientes = () => {
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
    cliente?.nombre
      ? (
        <>
          <h1 className=' font-black text-4xl text-blue-900'>
            Editar Cliente
          </h1>

          <p className=' mt-3'>Utiliza este formulario para editar datos de un cliente</p>

          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        </>
        )
      : <p className=' text-red-500 font-bold'>Error: Cliente ID inválido</p>
  )
}
