import * as argon2 from 'argon2'

const argonOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1
}

export async function hashPassword(password){
    try {
        return await argon2.hash(password, argonOptions)
    } catch (err) {
        throw new Error('Error al hashear la contraseña')
    }
}

export async function verifyPassword(hash, password) {
    try {
        return await argon2.verify(hash, password)
    } catch (err) {
        throw new Error('Error al verificar la contraseña')
        return false
    }
}
