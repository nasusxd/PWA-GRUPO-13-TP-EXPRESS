import { hashPassword, verifyPassword } from '../utils/hash.js'
import jwt from 'jsonwebtoken'
import { AppError } from '../utils/error.js'
import prisma from '../lib/prisma.js'

export const authService = {
    login: async (email, password) => {
        const user = await prisma.usuario.findUnique({ where: { email } })

        if (!user) throw new AppError('Credenciales invalidas', 401)

        const compare = await verifyPassword(user.password, password)
        if (!compare) throw new AppError('Credenciales invalidas', 401)

        const info = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
        const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '2h' })
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
        
        await prisma.usuario.update({ 
            where: { id: user.id }, 
            data: { refreshToken }
        })
        
        return { token, refreshToken, user: info }
    },

    register: async (email, password, nombre) => {
        const verificaruser = await prisma.usuario.findUnique({ where: { email } })
        if (verificaruser) throw new AppError('El correo electronico ya esta registrado', 409)

        const hash = await hashPassword(password)
        const nuevoUser = await prisma.usuario.create({
            data: {email, password: hash, nombre}
        })

        return { userId: nuevoUser.id }
    },
    getUserInfo: async (userId) => {
        const user = await prisma.usuario.findUnique({ 
            where: { id: userId },
            select: { id: true, nombre: true, email: true, rol: true }
        })

        return user
    },

    refreshToken: async (refreshToken) => {
       const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
       const user = await prisma.usuario.findUnique({ where: { id: decoded.id } })
        if (!user) throw new AppError('Usuario no encontrado', 401)

        const info = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user['rol']
        }

        const newAccessToken = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '15m' })
        const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
        return { newAccessToken, newRefreshToken }
    }
}