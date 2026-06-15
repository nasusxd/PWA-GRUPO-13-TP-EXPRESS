import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export const auth = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No autorizado' })
        }

        const token = authHeader.split(' ')[1]

        try {
            const tokenInfo = jwt.verify(token, process.env.JWT_SECRET)
            req.user = tokenInfo

            if (roles.length > 0 && !roles.includes(tokenInfo.rol)) {
                    return res.status(403).json({ message: 'Prohibido: Permisos insuficientes' })
                }
                next()
        } catch (error) {
            return res.status(401).json({message: 'Token expirado o no valido'})
        }
    }
}