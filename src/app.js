import express from 'express'
import routes from './routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import middleswareError from './middleswareError.js'

dotenv.config()

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: false
}));

app.use(express.json())
app.use('/', routes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok'})
})

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
});

app.use(middleswareError);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Servidor iniciado con exito', { url: `http://localhost:${PORT}` })
}).on('error', (error) => {
    console.log('Fallo al iniciar el servidor', error)
    process.exit(1)
})