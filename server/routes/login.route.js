require('../config/config');

const express = require('express');
const app = express();

const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/login',(req,res)=>{
    let body = req.body;
    
    Usuario.findOne({email:body.email},(err,userDB)=>{
        if(err) return res.status(500).json({ok:false,err});
        if(!userDB) return res.status(400).json({ok:false,error:'usuario y/o contraseña no válidos *.'})
        if(!bcrypt.compareSync(body.password,userDB.password)) return res.status(400).json({ok:false,error:'usuario y/o contraseña no válidos **.'});
        
        let token = jwt.sign({usuario:userDB._id},process.env.SEED,{expiresIn:process.env.CADUCIDAD});

        return res.json({
            ok:true,
            token
        });
    });
});


module.exports = app;
