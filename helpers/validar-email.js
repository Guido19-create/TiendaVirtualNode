import { Usuario } from "../models/mongoDB/Usuarios.js"


export const existeCorreo = async(correo) => {

    const users = await Usuario.find({correo});
    

    //Verificar si el usuario existe
    if( users.length === 0){
        return true; //Si no exite retorno true para poder regitrarlo
    } 

    //Verificar el estado del usuario
    users.forEach(usuario =>{
        if (usuario.estado) {
            throw new Error('Este correo no se puede registar porque existe en la Base de Datos');
        }
    });

    return true;

}