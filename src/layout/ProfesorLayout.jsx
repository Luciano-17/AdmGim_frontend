import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"

const ProfesorLayout = () => {
    return (
        <>
            <Header prof={true} />

            <div className="container mx-auto items-center justify-center my-10">
                <Outlet />
            </div>

            <Footer/>
        </>  
    )
}

export default ProfesorLayout