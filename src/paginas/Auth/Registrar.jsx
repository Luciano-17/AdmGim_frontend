import { useState } from "react"

import clienteAxios from '../../config/axios'

import Alerta from "../../components/Alerta"
import TituloAuth from "../../components/TituloAuth"
import LinksAuth from "../../components/LinksAuth"

import EvaluarInput from "../../helpers/EvaluarInput"


const Registrar = ({prof}) => {
    const [alerta, setAlerta] = useState({})

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const nombreInput = document.querySelector('#nombre')
        const apellidoInput = document.querySelector('#apellido')
        const telefonoInput = document.querySelector('#telefono')
        const emailInput = document.querySelector('#email')
        const passwordInput = document.querySelector('#password')
        const password2Input = document.querySelector('#password2')

        EvaluarInput(nombre, nombreInput)
        EvaluarInput(apellido, apellidoInput)
        EvaluarInput(telefono, telefonoInput)
        EvaluarInput(email, emailInput)
        EvaluarInput(password, passwordInput)
        EvaluarInput(password2, password2Input)

        if([nombre, apellido, telefono, email, password, password2].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        if(password !== password2) {
            passwordInput.classList.add('border-red-500')
            password2Input.classList.add('border-red-500')
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        } else {
            passwordInput.classList.remove('border-red-500')
            password2Input.classList.remove('border-red-500')
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
        setAlerta({})

        try {
            await clienteAxios.post('/profesor/registrar', {email, nombre, apellido, password})
            setAlerta({
                msg: 'Creado correctamente, revisa tu email',
                error: false
            })
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
            <div className="md:w-11/12 flex flex-col items-center justify-center">
                <TituloAuth parrafo={'Registra una nueva cuenta y disfruta de'} prof={prof} />

                <div className="bg-gray-200 rounded-md shadow-md mt-12 px-6 py-10 w-11/12 md:w-3/6 text-md">
                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                            <label className="label-md font-bold uppercase cursor-pointer" htmlFor='nombre'>Nombre</label>
                            <input 
                                type='text'
                                id="nombre"
                                placeholder="Tu nombre"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                            <label className="label-md font-bold uppercase cursor-pointer" htmlFor='apellido'>Apellido</label>
                            <input 
                                type='text'
                                id="apellido"
                                placeholder="Tu apellido"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={apellido}
                                onChange={e => setApellido(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                            <label className="label-md font-bold uppercase cursor-pointer" htmlFor='telefono'>Teléfono</label>
                            <input 
                                type='tel'
                                id="telefono"
                                placeholder="Tu teléfono"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                            />
                        </div>

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
                        
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-center">
                            <label className="label-md font-bold uppercase cursor-pointer" htmlFor='password2'>Repite contraseña</label>
                            <input 
                                type='password'
                                id="password2"
                                placeholder="Repite su contraseña"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                            />
                        </div>

                        {msg && <Alerta alerta={alerta} />}

                        <input 
                            type='submit'
                            value='Crear cuenta'
                            className={`mt-2 uppercase font-bold duration-300 ${prof ? 'bg-orange-500 hover:bg-orange-700' : 'bg-purple-500 hover:bg-purple-700'} md:w-4/6 md:mx-auto rounded-md py-2 shadow cursor-pointer`}
                        />
                    </form>
                </div>

                <LinksAuth links={['/', '/olvide-password']} mensaje={['¿Ya tienes una cuenta?', '¿Olvidaste tu contraseña?']} prof={prof} />
            </div>
        </>
    )
}

export default Registrar