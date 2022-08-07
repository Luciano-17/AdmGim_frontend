import { Link } from "react-router-dom"

const Footer = () => {
    const fecha = new Date
    const añoActual = fecha.getFullYear('Y')

    return (
        <footer className="bg-gray-800 text-gray-200 py-8 md:py-4">
            <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-0 justify-around items-center px-10 mx-auto">
                <p>
                    AdmGim | &copy; {añoActual}
                </p>

                <nav className="flex gap-4 text-2xl text-gray-800">
                    <Link 
                        className="bg-gray-200 py-2 px-5 rounded-full duration-300 hover:text-gray-200 hover:bg-blue-800"
                        to='#'>
                        <i className="fa-brands fa-facebook-f"></i>
                    </Link>

                    <Link 
                        className="bg-gray-200 py-2 px-4 rounded-full duration-300 hover:text-gray-200 hover:bg-blue-500"
                        to='#'>
                        <i className="fa-brands fa-facebook-messenger"></i>
                    </Link>

                    <Link 
                        className="bg-gray-200 py-2 px-4 rounded-full duration-300 hover:text-gray-200 hover:bg-emerald-500"
                        to='#'>
                        <i className="fa-brands fa-whatsapp"></i>
                    </Link>

                    <Link 
                        className="bg-gray-200 py-2 px-4 rounded-full duration-300 hover:text-gray-200 hover:bg-pink-600"
                        to='#'>
                        <i className="fa-brands fa-instagram"></i>
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer