import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de tanques',
            version: '1.0.0',
            description: 'API para gestionar tanques',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'servidor de desarrollo'
            },
            {
                url: 'https://pwa-grupo-13-tp-2.vercel.app',
                description: 'servidor de produccion'
            }
        ]
    },
    apis: [join(__dirname, './routes.js')] 
};

const especificaciones = swaggerJsdoc(options)

export default especificaciones

