import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tipos = ['agua', 'tanque de guerra', 'gas', 'nafta', 'industrial']

function generarNombre(i, tipo) {
    return `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}-${i}`
}

async function main() {
    const data = []
    let counter = 1
  
    while (data.length < 44) {
        for (const tipo of tipos) {
            if (data.length >= 44) break
            data.push({
                nombre: generarNombre(counter, tipo),
                tipo,
                descripcion: `Tanque tipo ${tipo} número ${counter}`
            })
            counter++
        }
    }

    console.log(`Se crearán ${data.length} registros de Tanque`)

    try {
        const result = await prisma.tanque.createMany({ data, skipDuplicates: true })
        console.log('Seed completado:', result)
    } catch (err) {
        console.error('Error en seed:', err)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
