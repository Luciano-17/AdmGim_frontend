import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import clienteAxios from '../../config/axios'

import FormRutina from "../../components/FormRutina"
import Rutina from "../../components/Rutina"

const CargarRutina = () => {
    const [alumno, setAlumno] = useState({})

    const params = useParams()
    const {id} = params

    useEffect(() => {
        const obtenerAlumno = async () => {

            try {
                const {data} = await clienteAxios(`/profesor/obtener-alumno/${id}`)
                setAlumno(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerAlumno()
    }, [])

    const {nombre, apellido, rutina, _id} = alumno

    return (
        <>
            <h2 className="text-center my-10 font-bold text-2xl px-1">Administra la rutina de {nombre} {apellido}</h2>

            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <FormRutina id={_id} />

                <ul className="mx-auto px-4 py-6 w-11/12 md:w-10/12 text-md">
                    {rutina ? 
                    (
                        <>
                            {rutina.map(ejercicio => (
                                <Rutina key={ejercicio.id} ejer={ejercicio} alumno={alumno}/>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className='text-center mt-5'>No tiene ejercicios cargados</p>
                        </>
                    )}
                </ul>
            </div>
        </>
    )
}

export default CargarRutina