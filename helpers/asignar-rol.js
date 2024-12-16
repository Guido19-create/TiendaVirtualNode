import { Rol } from "../models/mongoDB/Roles.js"


export const obtenerRol = async(rol) => {
    
    const rolBuscado = await Rol.findOne({nombre:rol});

    return rolBuscado._id;

}