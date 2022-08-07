import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto items-center justify-center md:mt-12 gap-10 p-5">
                <Outlet />
            </main>
        </>  
    )
}

export default AuthLayout