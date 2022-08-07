const EvaluarInput = (value, label) => {
    if(!value) {
        label.classList.add('border-red-500')
        label.classList.remove('border-transparent')
    } else {
        label.classList.remove('border-red-500')
        label.classList.add('border-transparent')
    }
}

export default EvaluarInput