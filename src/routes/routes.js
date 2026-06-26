import { Router } from 'express'
import prisma from '../lib/prisma.js'
import validarTanque from '../validations/validarTanque.js'
import { auth } from '../middlewares/authMiddleware.js'
import { tanqueService } from '../services/tanqueService.js'
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tanque:
 *       type: object
 *       required:
 *         - nombre
 *         - tipo
 *         - descripcion
 *         - imagen
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         tipo:
 *           type: string
 *         descripcion:
 *           type: string
 *         imagen:
 *           type: string
 *       example:
 *         nombre: T-90
 *         tipo: Batalla
 *         descripcion: Tanque de batalla
 *         imagen: https://url.jpg
 */


/**
 * @swagger
 * /tanques:
 *   get:
 *     summary: Obtiene todos los tanques
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Filtrar por tipo
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de tanques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tanque'
 *   post:
 *     summary: Crea un nuevo tanque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tanque'
 *     responses:
 *       201:
 *         description: Tanque creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tanque'
 *       400:
 *         description: Faltan campos obligatorios
 */

router.get("/tanques", async (req, res, next) => {
    try {
        const getAll = await tanqueService.getAll(req.query.search, req.query.tipo, req.query.page, req.query.limit)
        res.status(200).json({ data: getAll });
    }catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tanques/{id}:
 *   get:
 *     summary: Obtiene un tanque por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tanque encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tanque'
 *       404:
 *         description: Tanque no encontrado
 *   put:
 *     summary: Actualiza un tanque por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tanque'
 *     responses:
 *       200:
 *         description: Tanque actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tanque'
 *       404:
 *         description: Tanque no encontrado
 *       400:
 *         description: Faltan campos obligatorios
 *   delete:
 *     summary: Elimina un tanque por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tanque eliminado correctamente
 *       404:
 *         description: Tanque no encontrado
 */

router.get("/tanques/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) { return res.status(400).json({ error: "ID inválido" });}
        const tanque = await tanqueService.getById(id);
        res.status(200).json({ data: tanque });
    }
    catch (error) {
        next(error);
    }
});


router.post("/tanques", auth(['admin']), async (req, res, next) => {
    try {
        const errores = validarTanque(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ error: errores });
        }

        const {nombre, tipo, descripcion, imagen} = req.body;
        const tanque = await tanqueService.create(nombre, tipo, descripcion, imagen);
        res.status(201).json({ data: tanque });
    }
    catch (error) {
        next(error);
    }
});

router.put("/tanques/:id", auth(['admin']), async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if (isNaN(id)) { 
            return res.status(400).json({ error: "ID Inexistente"})
        };

        const errores = validarTanque(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ error: errores });
        }

        const {nombre, tipo, descripcion, imagen} = req.body;
        const tanque = await tanqueService.update(id, nombre, tipo, descripcion, imagen);
        res.status(200).json({data: tanque });
    }
    catch (error) {
        next(error);
    }
});

router.delete("/tanques/:id", auth(['admin']), async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) { 
            return res.status(400).json({ error: "ID Inexistente"})
        };
        
        await tanqueService.delete(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});

export default router