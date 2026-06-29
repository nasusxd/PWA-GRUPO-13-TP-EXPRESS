import { Router } from 'express'
import { AppError } from '../utils/error.js'
import { authService } from '../services/authService.js'
import { auth } from '../middlewares/authMiddleware.js'
import { validarRegister, validarLogin } from '../validations/validarAuth.js'
import prisma from '../lib/prisma.js'
const router = Router()

router.post('/login', async (req, res, next) => {
    try {
        const errores = validarLogin(req.body)
        if (errores.length > 0) return next(new AppError(errores.join(', '), 400))

        const {token, refreshToken, user} = await authService.login(req.body.email, req.body.password)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: `bienvenido ${user.nombre}`, token, user})
    } catch (error) {
        next(error)
    }
})

router.post('/logout', auth(), async (req, res, next) => {
    try {
        await prisma.usuario.update({
            where: { id: req.user.id },
            data: { refreshToken: null }
        })
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })
        res.status(200).json({ message: 'sesion cerrada correctamente' })
    } catch (error) {
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const errores = validarRegister(req.body)
        if (errores.length > 0) return next(new AppError(errores.join(', '), 400))

        const data = await authService.register(req.body.email, req.body.password, req.body.nombre)
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            userId: data.userId
        })
    } catch (error) {
        next(error)
    }
})

router.get ('/me', auth(), async(req, res, next)=> {
    try {
        const userInfo = await authService.getUserInfo(req.user.id)
        res.status(200).json({ data: userInfo })
    } catch (error) {
        next(error)
    }
} )

router.post('/refresh-token', async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return next(new AppError('No hay token de refresco', 401))

    try {
        const { newAccessToken, newRefreshToken } = await authService.refreshToken(refreshToken)
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        next(error)
    }
})

export default router
