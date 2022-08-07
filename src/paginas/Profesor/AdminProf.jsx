import useProfesor from '../../hooks/useProfesor'

import AlumnoRutina from '../../components/AlumnoRutina'

const AdminProf = () => {
    const {alumnos} = useProfesor()

    const sinRutina = []
    const conRutina = []
    
    alumnos.forEach(alumno => {
        if(!alumno.rutina) {
            sinRutina.push(alumno)
        } else {
            conRutina.push(alumno)
        }
    })

    return (
        <>
            <div className="w-11/12 mx-auto">
                <h2 className="text-center my-10 font-bold text-2xl">Administra a tus alumnos</h2>

                <div className="flex flex-col gap-4 items-center md:grid md:grid-cols-2 md:place-items-center md:items-start">
                    <div className="my-4">
                        <h3 className="text-center font-bold text-lg">Alumnos sin rutina</h3>
                        
                        {sinRutina.map((alumno) => 
                            <AlumnoRutina key={alumno._id} alumno={alumno} edit={false} />
                        )}

                        {sinRutina.length === 0 && (
                            <p className='text-center mt-4'>No hay registros</p>
                        )}
                    </div>

                    <div className="my-4">
                        <h3 className="text-center font-bold text-lg">Alumnos con rutina</h3>

                        {conRutina.map((alumno) => 
                            <AlumnoRutina key={alumno._id} alumno={alumno} edit={true} />
                        )}

                        {conRutina.length === 0 && (
                            <p className='text-center mt-4'>No hay registros</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProf