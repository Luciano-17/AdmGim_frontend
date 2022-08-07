import { Link } from "react-router-dom"

const LinksAuth = ({links, mensaje, prof}) => {
    return (
        <>
            <nav className="flex justify-between text-center flex-col gap-6 md:gap-0 md:flex-row md:w-10/12 mt-10 md:mt-16">
                <Link 
                    className={`duration-300 ${prof ? 'hover:text-orange-600' : 'hover:text-purple-600'}`}
                    to={links[0]}>
                    {mensaje[0]}
                </Link>

                <Link 
                    className={`duration-300 ${prof ? 'hover:text-orange-600' : 'hover:text-purple-600'}`}
                    to={links[1]}>
                    {mensaje[1]}
                </Link>
            </nav>
        </>
    )
}

export default LinksAuth