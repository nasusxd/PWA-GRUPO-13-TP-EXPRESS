function validarTanque(data) {
    const errores = [];

    if (!data.nombre || typeof data.nombre !== "string") {
        errores.push("El nombre es obligatorio");
    }

    if (!data.tipo || typeof data.tipo !== "string") {
        errores.push("El tipo es obligatorio");
    }

    if (!data.descripcion || typeof data.descripcion !== "string") {
        errores.push("La descripción es obligatoria");
    }

    return errores;
}

export default validarTanque;