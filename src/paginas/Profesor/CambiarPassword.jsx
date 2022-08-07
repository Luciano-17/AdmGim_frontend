import { useState } from "react"

import Alerta from "../../components/Alerta"
import useAuth from "../../hooks/useAuth"

const CambiarPassword = () => {
    const {guardarPassword} = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        passActual: '',
        passNuevo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        if(password.passNuevo.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true
            })
            return
        }

        const resultado = await guardarPassword(password)
        setAlerta(resultado)
    }

    const {msg} = alerta

    return (
        <>
            <h2 className="text-center font-bold text-2xl">Modifica tu información</h2>

            <div className="mx-auto rounded-md mt-12 w-11/12 md:w-6/12 text-md">
                <form 
                    className="bg-gray-200 shadow-md px-2 py-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 md:gap-4">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md font-bold uppercase cursor-pointer" htmlFor='passActual'>Contraseña actual</label>
                            <input 
                                type='password'
                                id="passActual"
                                name="passActual"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                        <label className="label-md font-bold uppercase cursor-pointer" htmlFor='passNuevo'>Contraseña nueva</label>
                            <input 
                                type='password'
                                id="passNuevo"
                                name="passNuevo"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <div className="w-full text-center">
                        <input
                            className="text-xl mx-auto cursor-pointer uppercase duration-300 bg-emerald-700 hover:bg-emerald-900 text-gray-200 rounded-md mt-5 py-1 w-full md:w-1/3"
                            type='submit'
                            value='Modificar'
                        />
                    </div>
                </form>
            </div>
        </>   
    )
}

export default CambiarPassword