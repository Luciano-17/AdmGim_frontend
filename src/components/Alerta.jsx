const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'bg-red-700' : 'bg-green-700'} text-center px-4 py-2 rounded-md uppercase text-gray-200 font-bold mt-5 text-sm`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta