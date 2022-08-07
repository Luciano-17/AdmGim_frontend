import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [cargando, setCargando] = useState({})
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autentificarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.get('/profesor/admin', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }
        autentificarUsuario()
    }, [])

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/profesor/perfil/${datos._id}`, datos, config)

            return {
                msg: 'Almacenado correctamente',
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/profesor/cambiar-password`, datos, config)
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                actualizarPerfil,
                guardarPassword,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext