import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { favoritoService } from '../services/favoritoService.js'
import { AppError } from '../utils/error.js'

const router = Router()

router.get('/', auth(['user', 'admin']), async (req, res, next) => {
  try {
    const usuarioId = req.user?.id
    const favoritos = await favoritoService.list(usuarioId)
    res.status(200).json({ data: favoritos })
  } catch (error) {
    next(error)
  }
})

router.post('/:id', auth(['user', 'admin']), async (req, res, next) => {
  try {
    const usuarioId = req.user?.id
    const tanqueId = Number(req.params.id)
    if (isNaN(tanqueId)) return next(new AppError('ID inválido', 400))

    const favorito = await favoritoService.add(usuarioId, tanqueId)
    res.status(201).json({ data: favorito })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', auth(['user', 'admin']), async (req, res, next) => {
  try {
    const usuarioId = req.user?.id
    const tanqueId = Number(req.params.id)
    if (isNaN(tanqueId)) return next(new AppError('ID inválido', 400))

    await favoritoService.remove(usuarioId, tanqueId)
    res.status(200).json({ message: 'Favorito eliminado' })
  } catch (error) {
    next(error)
  }
})

export default router
