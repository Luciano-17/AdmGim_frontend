import { useContext } from "react";
import ProfesorContext from "../context/ProfesorProvider";

const useProfesor = () => {
  return useContext(ProfesorContext)
}

export default useProfesor