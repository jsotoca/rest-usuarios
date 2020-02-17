const express = require('express');
const app = express();
const _ = require('underscore');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

const { validarToken,validarAdministrador } = require('../middlewares/autentificacion');

app.get('/usuario',(req,res)=>{
    Usuario.find({},(err,usersDB)=>{
        if (err) return res.status(500).json({ok:false,err});
        Usuario.countDocuments((err,total)=>{
            if (err) return res.status(500).json({ok:false,err});
            return res.json({
                ok:true,
                usuarios:usersDB,
                total
            });
        });
    });
});

app.post('/usuario',[validarToken,validarAdministrador],(req,res)=>{
    let body = req.body;
    let registrante = req.usuario;

    const usuario = new Usuario({
        nombres:body.nombres,
        email:body.email,
        password:bcrypt.hashSync(body.password,10)
    });
    
    usuario.save((err,userDB)=>{
        if (err) return res.status(500).json({ok:false,err});
        return res.json({
            ok:true,
            registrante,
            usuario_creado: userDB
        });
    });
});

app.put('/usuario/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    body = _.pick(body,['nombres','password','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,userDB)=>{
        if (err) return res.status(500).json({ok:false,err});
        return res.json({
            ok:true,
            usuario_modificado: userDB
        });
    });
});

app.delete('/usuario/:id',(req,res)=>{
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id,{estado:false},{new:true,runValidators:true},(err,userDB)=>{
        if (err) return res.status(500).json({ok:false,err});
        return res.json({
            ok:true,
            usuario_dado_baja: userDB
        });
    });
});

module.exports = app;