import { useState } from "react"
import EvaluarInput from "../helpers/EvaluarInput"
import Alerta from "../components/Alerta"
import useProfesor from "../hooks/useProfesor"

const FormRutina = ({id}) => {
    const [alerta, setAlerta] = useState({})

    const {guardarEjercicio} = useProfesor()

    const [ejercicio, setEjercicio] = useState('')
    const [series, setSeries] = useState('')
    const [rep, setRep] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault()

        const ejercicioInput = document.querySelector('#ejercicio')
        const seriesInput = document.querySelector('#series')
        const repInput = document.querySelector('#rep')
        EvaluarInput(ejercicio, ejercicioInput)
        EvaluarInput(series, seriesInput)
        EvaluarInput(rep, repInput)

        if([ejercicio, series, rep].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        const ejercicioForm = {
            nombre: ejercicio,
            series,
            rep,
            id: Date.now().toString(32) + Math.random().toString(32).substring(2)
        }

        const guardado = guardarEjercicio(id, ejercicioForm)
        if(guardado) {
            setAlerta({
                msg: 'Almacenado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
    }

    const {msg} = alerta

    return (
        <>
            <div className="mx-auto rounded-md mt-12 w-11/12 md:w-10/12 text-md">
                <form 
                    className="flex flex-col gap-4 bg-gray-200 shadow-md px-4 py-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 md:gap-4">
                        <li className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-rutina font-bold uppercase cursor-pointer" htmlFor='ejercicio'>Ejercicio</label>
                            <input 
                                type='text'
                                id="ejercicio"
                                placeholder="Nombre del ejercicio"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={ejercicio}
                                onChange={e => setEjercicio(e.target.value)}
                            />
                        </li>

                        <li className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-rutina font-bold uppercase cursor-pointer" htmlFor='series'>Series</label>
                            <input 
                                type='number'
                                id="series"
                                placeholder="Ingrese la cantidad de series"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={series}
                                onChange={e => setSeries(e.target.value)}
                            />
                        </li>

                        <li className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-rutina font-bold uppercase cursor-pointer" htmlFor='rep'>Repeticiones</label>
                            <input 
                                type='text'
                                id="rep"
                                placeholder="Ingrese las repeticiones"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={rep}
                                onChange={e => setRep(e.target.value)}
                            />
                        </li>
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input
                        className="text-xl cursor-pointer uppercase duration-300 bg-emerald-700 hover:bg-emerald-900 text-gray-200 rounded-md mt-5 py-1"
                        type='submit'
                        value='Agregar'
                    />
                </form>
            </div>
        </>
    )
}

export default FormRutina