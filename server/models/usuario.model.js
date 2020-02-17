const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE','MODERATOR_ROLE','USER_ROLE'],
    message: '{VALUE} no válido'
}

const usuarioSchema = new Schema({
    nombres:{type:String,required:[true,'nombres son requeridos'],minlength:3,maxlength:60},
    email:{type:String,required:[true,'email es requerido'],unique:true,minlength:6,maxlength:60},
    password:{type:String,required:[true,'contraseña es requerida'],minlength:6},
    role:{type:String,default:'USER_ROLE',enum:rolesValidos},
    estado:{type:Boolean,default:true},
    google:{type:Boolean,default:false}
},{timestamps:true});

usuarioSchema.plugin(uniqueValidator,'{PATH} ya se encuentra registrado');

usuarioSchema.methods.toJSON = function(){
    let usuario = this;
    let usuarioObject = usuario.toObject();
    delete usuarioObject.password;
    return usuarioObject;
}

module.exports = mongoose.model('usuario',usuarioSchema);

