import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const ProfesorContext = createContext()

const ProfesorProvider = ({children}) => {
    const [alumnos, setAlumnos] = useState([])

    useEffect(() => {
        const obtenerAlumnos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/profesor/obtener-alumnos', config)
                setAlumnos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerAlumnos()
    }, [])

    const eliminarAlumno = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')
        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/profesor/eliminar-alumno/${id}`, config)

                const pacientesActualizado = alumnos.filter(alumnosState => alumnosState._id !== id)
                setAlumnos(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const guardarEjercicio = async (id, ejercicio) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/profesor/guardar-ejercicio/${id}`,ejercicio, config)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarRutina = async (idE, alumno) => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')
        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.put(`/profesor/eliminar-ejercicio/${idE}`, alumno, config)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <ProfesorContext.Provider
            value={{
                alumnos,
                eliminarAlumno,
                guardarEjercicio,
                eliminarRutina
            }}
        >
            {children}
        </ProfesorContext.Provider>
    )
}

export {ProfesorProvider}
export default ProfesorContext