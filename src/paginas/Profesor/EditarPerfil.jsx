import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import useAuth from "../../hooks/useAuth"
import Alerta from "../../components/Alerta"

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth()
    const [alerta, setAlerta] = useState({})
    const [perfil, setPerfil] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const {nombre, apellido, email, telefono} = perfil

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre, apellido, email, telefono].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }

    const {msg} = alerta

    return (
        <>
            <h2 className="text-center font-bold text-2xl">Modifica tu información</h2>

            <div className="mx-auto rounded-md mt-12 w-11/12 md:w-8/12 text-md">
                <form 
                    className="bg-gray-200 shadow-md px-2 py-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 md:gap-4 md:grid md:grid-cols-2 md:place-items-center">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-perfil font-bold uppercase cursor-pointer" htmlFor='nombre'>Nombre</label>
                            <input 
                                type='text'
                                id="nombre"
                                name="nombre"
                                placeholder="Tu nombre"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-perfil font-bold uppercase cursor-pointer" htmlFor='apellido'>Apellido</label>
                            <input 
                                type='text'
                                id="apellido"
                                name="apellido"
                                placeholder="Tu apellido"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={perfil.apellido || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-perfil font-bold uppercase cursor-pointer" htmlFor='telefono'>Teléfono</label>
                            <input 
                                type='tel'
                                id="telefono"
                                name="telefono"
                                placeholder="Tu telefóno"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:justify-center">
                            <label className="label-md-perfil font-bold uppercase cursor-pointer" htmlFor='email'>E-mail</label>
                            <input 
                                type='email'
                                id="email"
                                name="email"
                                placeholder="E-mail de registro"
                                className="px-2 py-1 rounded-md border-2 border-transparent md:w-4/6"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
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
            
            <div className="w-full text-center mt-10">
                <Link
                    className="text-center duration-300 hover:text-orange-600"
                    to='/profesor/cambiar-password'>
                    Cambiar contraseña
                </Link>
            </div>
        </>
    )
}

export default EditarPerfil