import { Router } from 'express'
import prisma from './lib/prisma.js'
import validarTanque from './validarTanque.js'

const router = Router();

router.get("/tanques", async (req, res, next) => {
    try {
    const { search, tipo, page = 1, limit = 10 } = req.query;
    const tanques = await prisma.tanque.findMany({
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
    res.status(200).json({
        data: tanques
    });
    }catch (error) {
        next(error);
    }
});

router.get("/tanques/:id", async (req, res, next) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) { return res.status(400).json({ error: "ID inválido" });}
    const tanque = await prisma.tanque.findUnique({
        where: { id }
    });
    if (!tanque) {
        const error = new Error("Tanque no encontrado");
        error.status = 404;
        throw error;
    }
    res.status(200).json({
    data: tanque
    });
    }
    catch (error) {
    next(error);
}});

router.post("/tanques", async (req, res, next) => {
    try {
    const errores = validarTanque(req.body);
    if (errores.length > 0) {
        return res.status(400).json({
            error: errores
        });
    }
    const tanque = await prisma.tanque.create({
            data: req.body
        });
        res.status(201).json({
            data: tanque
        });
    }
    catch (error) {
        next(error);
    }
});

router.put("/tanques/:id", async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if (isNaN(id)) { return res.status(400).json({ error: "ID Inexistente"});}
        const existeTanque = await prisma.tanque.findUnique({
        where: { id}
    });
    if (!existeTanque) {
        const error = new Error("Tanque no encontrado");
        error.status = 404;
        throw error;
    }
    const errores = validarTanque(req.body);
    if (errores.length > 0) {
        return res.status(400).json({
            error: errores
        });
    }
    const tanque = await prisma.tanque.update({
        where: { id },
        data: req.body
    });
    res.status(200).json({
            data: tanque
        });
    }
    catch (error) {
        next(error);
}
});

router.delete("/tanques/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) { return res.status(400).json({ error: "ID Inexistente" });}
        const existeTanque = await prisma.tanque.findUnique({
        where: { id }
    });
    if (!existeTanque) {
        const error = new Error("Tanque no encontrado");
        error.status = 404;
        throw error;
    }
    await prisma.tanque.delete({
        where: { id }
    });
    res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});

export default router