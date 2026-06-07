import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import prisma from './lib/prisma.js'
import validarTanque from './validarTanque.js'

const router = Router();

router.get("/tanques", async (req, res) => {
    //const { search, tipo, page = 1, limit = 10 } = req.query;
    const tanques = await prisma.tanque.findMany({
        /*where: {
            ...(search && {
                nombre: {
                    contains: search,
                    mode: "insensitive"
                }
            }),
            ...(tipo && {
                tipo: tipo
            })
        },*/
        //skip: (Number(page) - 1) * Number(limit),
        //take: Number(limit)
    });
    res.status(200).json({
        data: tanques
    });
});

router.get("/tanques/:id", async (req, res) => {
    const tanque = await prisma.tanque.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    if (!tanque) {
        return res.status(404).json({
            error: "Tanque no encontrado"
        });
    }
    res.status(200).json({
        data: tanque
    });
});

router.post("/tanques", async (req, res, next) => {
    try {
    //const errores = validarTanque(req.body);
    //if (errores.length > 0) {
    //    return res.status(400).json({
    //        error: errores
    //    });
    //}
    const tanque = await prisma.tanque.create({
            data: req.body
        });
        res.status(201).json({
            data: tanque
        });
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
        error: "Error interno del servidor"
    });
    }
});

router.put("/tanques/:id", async (req, res) => {
    try{
        //const errores = validarTanque(req.body);
        //if (errores.length > 0) {
        //    return res.status(400).json({
        //        error: errores
        //    });
        //}

        const tanque = await prisma.tanque.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    });
    res.status(200).json({
            data: tanque
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
}
});

router.delete("/tanques/:id", async (req, res) => {
    await prisma.tanque.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    res.status(204).send();
});

export default router