function validarEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i
    return typeof email === 'string' && re.test(email)
}

function validarRegister(data) {
    const errores = []

    if (!data.email || !validarEmail(data.email)) {
        errores.push('Email invalido o faltante')
    }

    if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
        errores.push('La contraseña debe tener al menos 6 caracteres')
    }

    if (!data.nombre || typeof data.nombre !== 'string' || data.nombre.trim().length < 2) {
        errores.push('El nombre es obligatorio y debe tener al menos 2 caracteres')
    }

    return errores
}

function validarLogin(data) {
    const errores = []

    if (!data.email || !validarEmail(data.email)) {
        errores.push('Email invalido o faltante')
    }

    if (!data.password || typeof data.password !== 'string') {
        errores.push('La contraseña es obligatoria')
    }

    return errores
}

export { validarRegister, validarLogin }
