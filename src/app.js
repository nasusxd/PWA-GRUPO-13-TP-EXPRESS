import express from 'express'
import routes from './routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import middleswareError from './middlewares/middlewareError.js'
import swaggerUI from 'swagger-ui-express'
import especificaciones from './swagger.js'

dotenv.config()

const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'https://pwa-grupo-13-tp-2.vercel.app'],
  credentials: false
}));

app.use(express.json())
app.use('/', routes);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(especificaciones, {
    swaggerOptions: {
        url: '/swagger.json'
    }
}))

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

export default app;