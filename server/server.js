require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(require('./routes/index.route'));

mongoose.connect(process.env.MONGO_URI,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(err)=>{
    console.log(`Base de datos levantada en modo ${(!process.env.NODE_ENV)?'Desarrollo':'Producción'}`);
    app.listen(process.env.PORT,()=>{
        console.log(`Servidor levantado en el puerto ${process.env.PORT}`);
    });
});