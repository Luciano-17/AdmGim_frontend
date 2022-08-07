import useProfesor from "../hooks/useProfesor"

const Rutina = ({ejer, alumno}) => {
    const {eliminarRutina} = useProfesor()

    return (
        <>
            <div className="bg-gray-200 shadow-md rounded-md my-4 py-4 px-2 flex justify-between items-center">
                <div>
                    <li className="font-bold uppercase">{ejer.nombre}</li>
                    <li><span className="font-bold text-orange-600">Series:</span> {ejer.series} </li>
                    <li><span className="font-bold text-orange-600">Repeticiones:</span> {ejer.rep} </li>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        className="text-2xl cursor-pointer duration-300 text-red-700 hover:text-red-900"
                        type='button'
                        onClick={() => eliminarRutina(ejer.id, alumno)}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Rutina