import { Router, Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/error.js'
import { authService } from '../services/authService.js'
import { auth } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/login', async (req, res, next) => {
    try {
        const {token, refreshToken, nombre} = await authService.login(req.body.email, req.body.password)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: `bienvenido ${nombre}`, token})
    } catch (error) {
        next(error)
    }
})

router.post('/logout', (req, res, next) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    })
    res.status(200).json({ message: 'sesion cerrada correctamente' })
})

router.post('/register', async (req, res, next) => {
    try {
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
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        next(error)
    }
})

export default router
