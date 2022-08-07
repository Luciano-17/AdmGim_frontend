import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import TituloAuth from "../../components/TituloAuth"
import Alerta from "../../components/Alerta"

import EvaluarInput from "../../helpers/EvaluarInput"
import clienteAxios from "../../config/axios"

const NuevoPassword = ({prof}) => {
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [tokenValido, setTokenValido] = useState(false)

    const params = useParams()
    const {token} = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/profesor/olvide-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu nuevo password',
                    error: false
                })

                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error en el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        const passwordInput = document.querySelector('#password')
        EvaluarInput(password, passwordInput)

        if(password === '') {
            setAlerta({
                msg: 'La contraseña es obligatoria',
                error: true
            })
            return
        }
        if(password < 6) {
            passwordInput.classList.add('border-red-500')
            setAlerta({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true
            })
            return
        } else {
            passwordInput.classList.remove('border-red-500')
        }
        
        try {
            const {data} = await clienteAxios.post(`/profesor/olvide-password/${token}`, {password})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta

    return (
        <>
            <div className="md:w-11/12 flex flex-col items-center justify-center text-center">
                <TituloAuth parrafo={'Recupera tu contraseña y no te pierdas de'} prof={prof} />

                <div className="bg-gray-200 rounded-md shadow-md mt-12 px-6 py-10 w-11/12 md:w-3/6 text-md">
                    {msg && <Alerta alerta={alerta} />}

                    {tokenValido && (
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                                <label className="label-md font-bold uppercase cursor-pointer" htmlFor='password'>Nueva contraseña</label>
                                <input 
                                    type='password'
                                    id="password"
                                    placeholder="Ingrese su nueva contraseña"
                                    className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <input 
                                type='submit'
                                value='Iniciar sesión'
                                className={`mt-2 uppercase font-bold duration-300 ${prof ? 'bg-orange-500 hover:bg-orange-700' : 'bg-purple-500 hover:bg-purple-700'} md:w-4/6 md:mx-auto rounded-md py-2 shadow cursor-pointer`}
                            />
                        </form>
                    )}

                    {passwordModificado && (
                        <Link
                            className={`duration-300 mt-10 ${prof ? 'hover:text-orange-600' : 'hover:text-purple-600'}`}
                            to='/'>
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default NuevoPassword