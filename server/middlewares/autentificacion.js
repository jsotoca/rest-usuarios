const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

let validarToken = (req,res,next)=>{
    let token = req.get('token');
    
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err) return res.status(401).json({ok:false,error:'token inválido'});
        req.usuario = decoded.usuario;
        next();
    });
};

let validarAdministrador = (req,res,next)=>{
    let usuario = req.usuario;
    Usuario.findOne({_id:usuario},(err,userDB)=>{
        if(err) return res.status(500).json({ok:false,err});
        if(userDB.role !== 'ADMIN_ROLE') return res.status(401).json({ok:false,error:'usuario sin autorización.'});
        if(!userDB.estado) return res.status(401).json({ok:false,error:'usuario dado de baja.'});
        next();
    });
}

module.exports = { 
    validarToken,
    validarAdministrador
}