import bcryptjs from "bcryptjs";
import { Usuario } from "../models/Usuarios.js";
import { hashearPass } from "../helpers/hashearPassword.js";


export const actualizarPassword = async (req, res) => {
    //Obtener la informacion del body
    const { password, newPassword } = req.body;

    const correo = req.payload.correo;

    const usuario = await Usuario.findOne({ correo });
  
 
    const passwordGuardada = usuario.password;
  
    //Verificar si las contraseñas son iguales
    const isEqualsPassword = await bcryptjs.compare(password, passwordGuardada);
  
    if (isEqualsPassword) {
      const passwordEncriptada = hashearPass(newPassword);

      usuario.updateOne({ password: passwordEncriptada });

      return res.status(201).json({ msg: "Contraseña actualizada correctamente" });

    } else {
      return res.status(401).json({
          msg: "No se puede actualizar la contraseña  - contraseña incorrecta",
        });
    }
  
};


export const obtenerUsuarios = async( req, res ) => {
    const usuarios = await Usuario.find();

    res.status(200).json({usuarios});
};


