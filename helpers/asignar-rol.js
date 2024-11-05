import { Rol } from "../models/Roles.js"


export const obtenerRol = async(rol) => {
    
    const rolBuscado = await Rol.findOne({nombre:rol});

    return rolBuscado._id;

}