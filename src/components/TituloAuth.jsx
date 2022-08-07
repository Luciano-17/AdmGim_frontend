const TituloAuth = ({parrafo, prof}) => {
    return (
        <>
            <h2 
                className={`title-page text-6xl md:text-8xl font-bold bg-gradient-to-r ${prof ? 'from-yellow-500 via-orange-700 to-red-900' : 'from-cyan-500 via-purple-700 to-blue-900'} `}>
                AdmGim
            </h2>

            <p className="text-2xl md:text-4xl mt-6 text-center">
                {parrafo} {""}
                <span className={`font-bold ${prof ? 'text-orange-700' : 'text-purple-700'}`}>AdmGim</span>
            </p>
        </>
    )
}

export default TituloAuth