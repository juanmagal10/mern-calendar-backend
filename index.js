const express = require('express');
const { dbConection } = require('./database/config');
require('dotenv').config();
const cors=require('cors')



// crear el servidor de express

const app = express();

//base de datos
dbConection();

//Cors
app.use(cors())


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
});

//directorio publico
app.use(express.static('public'));

// lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));




