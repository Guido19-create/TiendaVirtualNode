import { Usuario } from "../models/Usuarios.js";

export const validarRol = (rolAValidar) => {
  return async (req, res, next) => {
    const correo = req.payload.correo;

    const usuario = await Usuario.findOne({ correo: correo }).populate("rol");

    const rolesDelUsuario = usuario.rol;

    for (let rol of rolesDelUsuario) {
        if (rolAValidar === rol.nombre) {
            return next()
        }
    }
    res.status(403).json({msg: 'Rol no valido para acceder a esta ruta'});
  };
};
