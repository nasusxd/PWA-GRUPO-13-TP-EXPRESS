import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
    {
        nombre: "Tiger I",
        tipo: "tanque de guerra",
        descripcion: "Tanque pesado alemán de la Segunda Guerra Mundial",
        imagen: "https://tankmuseum.org/wp-content/uploads/2020/04/Tiger-I-feat-1100x500.jpg"
    },
    {
        nombre: "T-34",
        tipo: "tanque de guerra",
        descripcion: "Tanque soviético clave en la Segunda Guerra Mundial",
        imagen: "https://tankmuseum.org/wp-content/uploads/2020/11/T-34-76-Featured.jpg"
    },
    {
        nombre: "M4 Sherman",
        tipo: "tanque de guerra",
        descripcion: "Tanque medio usado por EE.UU.",
        imagen: "https://tankmuseum.org/wp-content/uploads/2020/06/M4A1-Sherman.png"
    },
    {
        nombre: "Leopard 2",
        tipo: "tanque de guerra",
        descripcion: "Tanque moderno alemán",
        imagen: "https://knds.com/_next/image?url=https%3A%2F%2Fknds.com%2Fmedia%2FLeopard_2_A6_KMW_001_a95da2f973.jpg&w=3840&q=75"
    },
    {
        nombre: "M1 Abrams",
        tipo: "tanque de guerra",
        descripcion: "Tanque moderno estadounidense",
        imagen: "https://static.wikia.nocookie.net/featteca/images/a/a3/Abrams-tank.png/revision/latest/scale-to-width-down/1200?cb=20250501165708&path-prefix=es"
    },
    {
        nombre: "Challenger 2",
        tipo: "tanque de guerra",
        descripcion: "Tanque británico moderno",
        imagen: "https://i0.wp.com/www.zona-militar.com/wp-content/uploads/2025/01/Ukrainian-Challenger-2-called-Baby-251124-CREDIT-Ukrainian-MOD-1.jpg?fit=1920%2C1080&ssl=1"
    },
    {
        nombre: "Leclerc",
        tipo: "tanque de guerra",
        descripcion: "Tanque francés con sistema automático",
        imagen: "https://d7z22c0gz59ng.cloudfront.net/cms/img/usr/item/3/35362/35362_1.jpg"
    },
    {
        nombre: "T-90",
        tipo: "tanque de guerra",
        descripcion: "Tanque ruso moderno",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2013_Moscow_Victory_Day_Parade_%2828%29.jpg/1280px-2013_Moscow_Victory_Day_Parade_%2828%29.jpg"
    },
    {
        nombre: "Merkava Mk 4",
        tipo: "tanque de guerra",
        descripcion: "Tanque israelí",
        imagen: "https://cdn.vozpopuli.com/cdn/posts/2795621/articulos-2312413-1200x700.jpg"
    },
    {
        nombre: "Type 99",
        tipo: "tanque de guerra",
        descripcion: "Tanque chino moderno",
        imagen: "https://www.revistaejercitos.com/wp-content/uploads/2020/03/7070332d9a361f724af4e8127a9d53b9.jpg"
    },

    // 💧 AGUA (5)
    {
        nombre: "Tanque Elevado Municipal",
        tipo: "agua",
        descripcion: "Tanque elevado para distribución de agua potable",
        imagen: "https://muniguatealfrente.com/wp-content/uploads/WhatsApp-Image-2025-04-25-at-2.30.40-PM.jpeg"
    },
    {
        nombre: "Reservorio Cilíndrico",
        tipo: "agua",
        descripcion: "Almacenamiento industrial de agua",
        imagen: "https://thumbs.dreamstime.com/b/large-water-storage-tank-garden-green-plastic-setting-flowers-foreground-105060796.jpg"
    },
    {
        nombre: "Tanque Subterráneo",
        tipo: "agua",
        descripcion: "Sistema de almacenamiento bajo tierra",
        imagen: "https://img.magnific.com/free-photo/huge-plastic-tank-water-isolated-white_93675-135238.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
        nombre: "Tanque Rural",
        tipo: "agua",
        descripcion: "Uso agrícola y rural",
        imagen: "https://thumbs.dreamstime.com/b/un-tanque-r%C3%BAstico-de-agua-hormig%C3%B3n-rural-en-el-campo-una-granja-finca-cercana-al-pueblo-arcabuco-las-monta%C3%B1as-andinas-centrales-220331885.jpg"
    },
    {
        nombre: "Tanque Fibra de Vidrio",
        tipo: "agua",
        descripcion: "Tanque doméstico resistente",
        imagen: "https://www.plaremesa.net/wp-content/uploads/2019/10/tanques-de-agua-en-fibra-de-vidrio.jpg"
    },

    {
        nombre: "Tanque LPG Horizontal",
        tipo: "gas",
        descripcion: "Gas licuado industrial",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJVsZsPSUsYGNW-0b96NUPMe9Tsq2DVC2QA&s"
    },
    {
        nombre: "Tanque Esférico",
        tipo: "gas",
        descripcion: "Uso petroquímico",
        imagen: "https://tatsa.mx/wp-content/uploads/2023/01/recipientes-esfe204129ricos-2.webp"
    },
    {
        nombre: "Tanque Criogénico",
        tipo: "gas",
        descripcion: "Gases a baja temperatura",
        imagen: "https://airgasnoticias.com/images/Tanque_criogenico.jpg"
    },
    {
        nombre: "Tanque Vertical Gas Natural",
        tipo: "gas",
        descripcion: "Almacenamiento de gas natural",
        imagen: "https://lh5.googleusercontent.com/proxy/oIADUHCmn3E3ZyG2dolLwgqxjZEh0784qanpgkMGwk4qFqZFkyhZnw3SNd7FuF4fIVWg-Yfnl8OKkTvgzZ6mVtMcCr9bjDr7FWENMzRS6dFzsnFjEIBqGp2eZmPv"
    },
    {
        nombre: "Tanque de Propano",
        tipo: "gas",
        descripcion: "Uso doméstico e industrial",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDu3euU80ISXS5Hu4zhG2Kew9k7MOamReQA&s"
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