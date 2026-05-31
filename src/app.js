
import express from 'express'
import routes from './routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: false
}));

app.use(express.json())
app.use('/', routes)

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok'})
})

const PORT = process.env.PORT

try {
    //await primsa.$connect()
    app.listen(PORT, () => {
        console.log('Servidor iniciado con exito', { url: `http://localhost:${PORT}` })
    })
} catch (error) {
    if(error) {
    console.log('Fallo la conexion de la base de datos', error)
    } else {
        console.log('Fallo la conexion de la base de datos con un error desconocido',error)
    }
}