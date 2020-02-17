// Verificando entorno
let entorno = process.env.NODE_ENV || 'dev';

//Puerto del servidor
process.env.PORT = process.env.PORT || 3000;
//Conexion con MongoDB
if(entorno === 'dev') process.env.MONGO_URI = 'mongodb://localhost:27017/prueba';
//variables de token
process.env.CADUCIDAD  = '30d';
if(entorno === 'dev') process.env.SEED = 'n9CBgpf%gLM@';
