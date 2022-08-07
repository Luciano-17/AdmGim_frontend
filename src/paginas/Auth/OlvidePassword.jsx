import { useState } from "react"

import Alerta from "../../components/Alerta"
import TituloAuth from "../../components/TituloAuth"
import LinksAuth from "../../components/LinksAuth"

import EvaluarInput from "../../helpers/EvaluarInput"
import clienteAxios from "../../config/axios"

const OlvidePassword = ({prof}) => {
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const emailInput = document.querySelector('#email')
        EvaluarInput(email, emailInput)

        if(email === '') {
            setAlerta({
                msg: 'El E-mail es obligatorio',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post('/profesor/olvide-password', {email})
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
    }

    const {msg} = alerta

    return (
        <>
            <div className="md:w-11/12 flex flex-col items-center justify-center">
                <TituloAuth parrafo={'Recupera tu contraseña y no te pierdas de'} prof={prof} />

                <div className="bg-gray-200 rounded-md shadow-md mt-12 px-6 py-10 w-11/12 md:w-3/6 text-md">
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

                        {msg && <Alerta alerta={alerta} />}

                        <input 
                            type='submit'
                            value='Enviar instrucciones'
                            className={`mt-2 uppercase font-bold duration-300 ${prof ? 'bg-orange-500 hover:bg-orange-700' : 'bg-purple-500 hover:bg-purple-700'} md:w-4/6 md:mx-auto rounded-md py-2 shadow cursor-pointer`}
                        />
                    </form>
                </div>

                <LinksAuth links={['/', '/registrar']} mensaje={['¿Ya tienes una cuenta?', '¿Aún no tienes una cuenta?']} prof={prof} />
            </div>
        </>
    )
}

export default OlvidePassword