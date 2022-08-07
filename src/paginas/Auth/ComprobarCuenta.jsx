import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import clienteAxios from "../../config/axios"
import Alerta from "../../components/Alerta"

import TituloAuth from "../../components/TituloAuth"

const ComprobarCuenta = ({prof}) => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const {id} = params

    useEffect(() => {
        const comprobarCuenta = async () => {
            try {
                const {data} = await clienteAxios(`/profesor/confirmar/${id}`)

                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setCargando(false)
        }
        comprobarCuenta()
    }, [])

    return (
        <>
            <div className="md:w-11/12 flex flex-col items-center justify-center">
                {cuentaConfirmada ? (
                    <TituloAuth parrafo={'Cuenta confirmada correctamente en'} prof={prof} />
                ) : <TituloAuth parrafo={'No se pudo confirmar la cuenta en'} prof={prof} /> }
                

                <div className="bg-gray-200 rounded-md shadow-md mt-10 px-6 py-10 w-11/12 md:w-3/6 text-md text-center">
                    {!cargando && <Alerta alerta={alerta} />}

                    {cuentaConfirmada && (
                        <Link
                            className={`duration-300 ${prof ? 'hover:text-orange-600' : 'hover:text-purple-600'}`}
                            to='/'>
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default ComprobarCuenta