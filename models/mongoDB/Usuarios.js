import {model,Schema} from "mongoose";


const UsuarioSchema = new Schema({
    correo:{ 
        type:String, 
        required:true
    },
    password: {
        type: String,
        required:true
    },
    numeroDeTelefono:{type:String},
    fotoDePerfil:{ type: String },
    estado: {type: Boolean, default: true},
    rol:[{type: Schema.Types.ObjectId, ref: 'Rol'}],
    Pedidos: [{type: Schema.Types.ObjectId, ref: 'Pedidos'}]
});

UsuarioSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v
    return user;
};

const Usuario = model("Usuario", UsuarioSchema);

export { Usuario }