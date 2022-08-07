import { useState } from "react"
import { useNavigate } from "react-router-dom"

import clienteAxios from "../../config/axios"

import useAuth from '../../hooks/useAuth'

import Alerta from "../../components/Alerta"
import TituloAuth from "../../components/TituloAuth"
import LinksAuth from "../../components/LinksAuth"

import EvaluarInput from "../../helpers/EvaluarInput"

const Login = ({prof}) => {
    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const [alerta, setAlerta] = useState({})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const emailInput = document.querySelector('#email')
        const passwordInput = document.querySelector('#password')

        EvaluarInput(email, emailInput)
        EvaluarInput(password, passwordInput)

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post('/profesor/login', {email, password})

            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/profesor')
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
        <div className="flex flex-col items-center justify-center">
            <TituloAuth parrafo={'Inicia sesión y disfruta de tu'} prof={prof} />

            <div className="bg-gray-200 rounded-md shadow-md mt-12 px-6 py-10 w-11/12 md:w-4/6 lg:w-2/6 text-md">
                <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                        <label className="label-md font-bold uppercase cursor-pointer" htmlFor='email'>E-mail</label>
                        <input 
                            type='email'
                            id="email"
                            placeholder="E-mail de registro"
                            className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                        <label className="label-md font-bold uppercase cursor-pointer" htmlFor='password'>Contraseña</label>
                        <input 
                            type='password'
                            id="password"
                            placeholder="Ingrese su contraseña"
                            className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value='Iniciar sesión'
                        className={`mt-2 uppercase font-bold duration-300 ${prof ? 'bg-orange-500 hover:bg-orange-700' : 'bg-purple-500 hover:bg-purple-700'} md:w-4/6 md:mx-auto rounded-md py-2 shadow cursor-pointer`}
                    />
                </form>
            </div>

            <LinksAuth links={['/registrar', '/olvide-password']} mensaje={['¿Aún no tienes una cuenta?', '¿Olvidaste tu contraseña?']} prof={prof} />
        </div>
    </>
  )
}

export default Login