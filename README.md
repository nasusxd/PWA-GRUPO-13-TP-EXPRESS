

Comandos para migraciones, seed y validación de la base de datos 

- Ejecutar migraciones en desarrollo (crea/actualiza la BD):
npm run migrate:dev

- Aplicar migraciones en un entorno ya configurado (deploy):
npm run migrate:deploy


- Cargar el seed (crea 40 registros en la tabla `Tanque`):
npm run db:seed
El seed usa el script: [prisma/seed.js](prisma/seed.js)

- Validar que la BD no esté vacía (sale con código 0 si hay datos):
npm run db:validat
El validador usa el script: [prisma/validateDb.js](prisma/validateDb.js)

