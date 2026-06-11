import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
    {
        nombre: "Tiger I",
        tipo: "tanque de guerra",
        descripcion: "Tanque pesado alemán de la Segunda Guerra Mundial",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Tiger_I_tank.jpg"
    },
    {
        nombre: "T-34",
        tipo: "tanque de guerra",
        descripcion: "Tanque soviético clave en la Segunda Guerra Mundial",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/1/17/T34-85-latrun-2.jpg"
    },
    {
        nombre: "M4 Sherman",
        tipo: "tanque de guerra",
        descripcion: "Tanque medio usado por EE.UU.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0c/M4_Sherman_tank.jpg"
    },
    {
        nombre: "Leopard 2",
        tipo: "tanque de guerra",
        descripcion: "Tanque moderno alemán",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Leopard_2_A5_der_Bundeswehr.jpg"
    },
    {
        nombre: "M1 Abrams",
        tipo: "tanque de guerra",
        descripcion: "Tanque moderno estadounidense",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/2/27/M1A1_Abrams.jpg"
    },
    {
        nombre: "Challenger 2",
        tipo: "tanque de guerra",
        descripcion: "Tanque británico moderno",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/7/77/Challenger_2_Tank.jpg"
    },
    {
        nombre: "Leclerc",
        tipo: "tanque de guerra",
        descripcion: "Tanque francés con sistema automático",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Leclerc_tank_2015.jpg"
    },
    {
        nombre: "T-90",
        tipo: "tanque de guerra",
        descripcion: "Tanque ruso moderno",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0f/T-90_tank.JPG"
    },
    {
        nombre: "Merkava Mk 4",
        tipo: "tanque de guerra",
        descripcion: "Tanque israelí",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Merkava_Mk_4.jpg"
    },
    {
        nombre: "Type 99",
        tipo: "tanque de guerra",
        descripcion: "Tanque chino moderno",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Type_99_tank.jpg"
    },

    // 💧 AGUA (5)
    {
        nombre: "Tanque Elevado Municipal",
        tipo: "agua",
        descripcion: "Tanque elevado para distribución de agua potable",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Water_tower.jpg"
    },
    {
        nombre: "Reservorio Cilíndrico",
        tipo: "agua",
        descripcion: "Almacenamiento industrial de agua",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Water_storage_tanks.jpg"
    },
    {
        nombre: "Tanque Subterráneo",
        tipo: "agua",
        descripcion: "Sistema de almacenamiento bajo tierra",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Underground_water_tank.jpg"
    },
    {
        nombre: "Tanque Rural",
        tipo: "agua",
        descripcion: "Uso agrícola y rural",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Farm_water_tank.jpg"
    },
    {
        nombre: "Tanque Fibra de Vidrio",
        tipo: "agua",
        descripcion: "Tanque doméstico resistente",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/8/84/Plastic_water_tank.jpg"
    },


    {
        nombre: "Tanque LPG Horizontal",
        tipo: "gas",
        descripcion: "Gas licuado industrial",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/5/5d/LPG_tank.jpg"
    },
    {
        nombre: "Tanque Esférico",
        tipo: "gas",
        descripcion: "Uso petroquímico",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Spherical_gas_tank.jpg"
    },
    {
        nombre: "Tanque Criogénico",
        tipo: "gas",
        descripcion: "Gases a baja temperatura",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Cryogenic_tank.jpg"
    },
    {
        nombre: "Tanque Vertical Gas Natural",
        tipo: "gas",
        descripcion: "Almacenamiento de gas natural",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Gas_storage_tank.jpg"
    },
    {
        nombre: "Tanque de Propano",
        tipo: "gas",
        descripcion: "Uso doméstico e industrial",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/7/72/Propane_tank.jpg"
    }
]

async function main() {
    try {
        console.log(" Limpiando tabla Tanque...")
        await prisma.tanque.deleteMany()

        console.log(" Insertando tanques...")
        const result = await prisma.tanque.createMany({ data })

        console.log(" Seed completado:", result)
    } catch (err) {
        console.error(" Error en seed:", err)
    } finally {
        await prisma.$disconnect()
    }
}

main()