import useProfesor from "../hooks/useProfesor"

import { Link } from "react-router-dom"

const AlumnoRutina = ({alumno, edit}) => {
    const {nombre, apellido, email, telefono, _id} = alumno
    const {eliminarAlumno} = useProfesor()

    return (
        <>
            <div className="bg-gray-200 p-4 my-4 rounded-md shadow-md">
                <ul className="flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
                    <div>
                        <li>
                            <span className="font-bold text-orange-500">Nombre: </span> {nombre} {apellido}
                        </li>
                        <li>
                            <span className="font-bold text-orange-500">E-mail: </span> {email}
                        </li>
                        <li>
                            <span className="font-bold text-orange-500">Teléfono: </span> {telefono}
                        </li>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-2">
                        <Link
                            className={`text-2xl duration-300 ${edit ? 'text-emerald-700 hover:text-emerald-900' : 'text-blue-700 hover:text-blue-900'} `}
                            to={`/profesor/cargar-rutina/${_id}`}>
                            <i className={`${edit ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-file-circle-plus'}`}></i>
                        </Link>
                        <button
                            className="text-2xl duration-300 text-red-700 hover:text-red-900"
                            type='button'
                            onClick={() => eliminarAlumno(_id)}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default AlumnoRutina