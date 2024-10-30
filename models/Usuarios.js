import {model,Schema} from "mongoose";


const UsuarioSchema = new Schema({
    correo:{ 
        type:String, 
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    numeroDeTelefono:{type:String},
    fotoDePerfil:{ type: String },
    rol:[{type: Schema.Types.ObjectId, ref: 'Roles'}],
    Pedidos: [{type: Schema.Types.ObjectId, ref: 'Pedidos'}]
});

UsuarioSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const Usuario = model("Usuario", UsuarioSchema);

export { Usuario }