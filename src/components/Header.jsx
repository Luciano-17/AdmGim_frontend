import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import { useNavigate } from "react-router-dom"

const Header = ({prof}) => {
    const navigate = useNavigate()

    const {cerrarSesion} = useAuth()

    const cerrarSesionFn = () => {
        cerrarSesion()
        navigate('/')
    }

    return (
        <header className="bg-gray-800 text-gray-200 w-full py-4 shadow-md">
            <div className="flex justify-between items-center px-6 md:px-0 md:w-10/12 mx-auto">
                <Link
                    to={`${prof ? '/profesor' : '/alumno-rutina'}`}>
                    <h2 className={`${prof ? 'hover:text-orange-500' : 'hover:text-purple-500'} duration-300 font-bold text-2xl`}>
                        AdmGim
                    </h2>
                </Link>

                <nav className="flex gap-6">
                    <Link
                        className={`${prof ? 'hover:text-orange-500' : 'hover:text-purple-500'} duration-300`}
                        to='/profesor/perfil'>
                        Perfil
                    </Link>

                    <button
                        type="button"
                        className={`${prof ? 'hover:text-orange-500' : 'hover:text-purple-500'} duration-300`}
                        onClick={() => cerrarSesionFn()}>
                        Cerrar sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header