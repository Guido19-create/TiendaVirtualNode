import { Usuario } from "../models/Usuarios.js"


export const existeCorreo = async(correo) => {

    const user = await Usuario.findOne({correo});
    
    if( user ){
        throw new Error('Este correo no se puede registar porque existe en la Base de Datos');
    } 

    return true;

}