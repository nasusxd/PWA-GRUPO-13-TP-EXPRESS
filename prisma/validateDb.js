import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const count = await prisma.tanque.count()
        console.log(`Cantidad de tanques en la BD: ${count}`)
        if (count > 0) {
            console.log('La base de datos NO está vacía.')
            process.exit(0)
        } else {
            console.error('La base de datos está VACÍA.')
            process.exit(2)
        }
    } catch (err) {
        console.error('Error al validar la BD:', err)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
