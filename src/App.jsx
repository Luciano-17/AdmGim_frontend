import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import ProfesorLayout from './layout/ProfesorLayout'

import Login from './paginas/Auth/Login'
import Registrar from './paginas/Auth/Registrar'
import ComprobarCuenta from './paginas/Auth/ComprobarCuenta'
import OlvidePassword from './paginas/Auth/OlvidePassword'
import NuevoPassword from './paginas/Auth/NuevoPassword'

import AdminProf from './paginas/Profesor/AdminProf'
import CargarRutina from './paginas/Profesor/CargarRutina'
import EditarPerfil from './paginas/Profesor/EditarPerfil'
import CambiarPassword from './paginas/Profesor/CambiarPassword'

import {AuthProvider} from './context/AuthProvider'
import {ProfesorProvider} from './context/ProfesorProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfesorProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />} >
              <Route index element={<Login prof={true} />} />
              <Route path='registrar' element={<Registrar prof={true} />} />
              <Route path='confirmar/:id' element={<ComprobarCuenta prof={true} />} />
              <Route path='olvide-password' element={<OlvidePassword prof={true} />} />
              <Route path='olvide-password/:token' element={<NuevoPassword prof={true} />} />
            </Route>

            <Route path='/profesor' element={<ProfesorLayout />} >
              <Route index element={<AdminProf />} />
              <Route path='cargar-rutina/:id' element={<CargarRutina />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
        </ProfesorProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
