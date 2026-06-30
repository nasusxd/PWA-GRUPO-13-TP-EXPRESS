import prisma from '../lib/prisma.js'
import { AppError } from '../utils/error.js'

export const favoritoService = {
  list: async (usuarioId) => {
    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId },
      include: { tanque: true }
    })

    return favoritos.map(f => f.tanque)
  },

  add: async (usuarioId, tanqueId) => {
    const tanque = await prisma.tanque.findUnique({ where: { id: tanqueId } })
    if (!tanque) throw new AppError('Elemento no encontrado', 404)

    const existing = await prisma.favorito.findUnique({ where: { usuarioId_tanqueId: { usuarioId, tanqueId } } })
    if (existing) throw new AppError('Favorito ya existe', 409)

    const favorito = await prisma.favorito.create({ data: { usuarioId, tanqueId } })
    return favorito
  },

  remove: async (usuarioId, tanqueId) => {
    const existing = await prisma.favorito.findUnique({ where: { usuarioId_tanqueId: { usuarioId, tanqueId } } })
    if (!existing) throw new AppError('Favorito no encontrado', 404)

    await prisma.favorito.delete({ where: { id: existing.id } })
    return
  }
}
