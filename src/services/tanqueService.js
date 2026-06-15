import { AppError } from '../utils/error.js'
import prisma from '../lib/prisma.js'

export const tanqueService = {
    getAll: async (search, tipo, page = 1, limit = 10) => {
        const tanques = await prisma.tanque.findMany({
            select: {
            id: true,
                nombre: true,
                tipo: true,
                descripcion: true,
                imagen: true
            },
            where: {
                ...(search && {
                    nombre: {
                        contains: search,
                        mode: "insensitive"
                    }
                }),
                ...(tipo && {
                    tipo: tipo
                })
            },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });
        return tanques;
    },

    getById: async (id) => {
        const tanque = await prisma.tanque.findUnique({ where: { id } });
        if (!tanque) throw new AppError('Tanque no encontrado', 404)
        return tanque;
    },

    create: async (nombre, tipo, descripcion, imagen) => {
        return await prisma.tanque.create({ data: {nombre, tipo, descripcion, imagen} });
    },

    update: async (id, nombre, tipo, descripcion, imagen) => {
        await tanqueService.getById(id) 
        return await prisma.tanque.update({ 
            where: { id },
            data: {nombre, tipo, descripcion, imagen}
        });
    },

    delete: async (id) => {
        await tanqueService.getById(id)
        await prisma.tanque.delete({ where: { id } })
    }
}