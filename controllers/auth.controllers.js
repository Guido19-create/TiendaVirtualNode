import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { Usuario } from "../models/mongoDB/Usuarios.js";
import { hashearPass } from "../helpers/hashearPassword.js";
import { Rol } from "../models/mongoDB/Roles.js"

export const registrar = async (req, res) => {
  //Extraer los datos
  const { correo, password } = req.body;

  //Encriptar la contraseña

  const passwordEncriptada = hashearPass(password);

  //const idRol = obtenerRol("CLIENTE");
  const idRolBuscado = await Rol.findOne({nombre:"CLIENTE"});

  //Asignar rol por defecto
  const usuario = new Usuario({ 
    correo, 
    password: passwordEncriptada,
    rol:[idRolBuscado]
  });
  
  //Guardar los datos en la base de datos
  try {
    await usuario.save();

  } catch (err) {
    res.status(500).json({ msg: "No se puede grabar el usuario en la base datos", err });
  }

  //Enviar la respuesta
  res.status(201).json({ usuario });
};

export const iniciarSesion = async (req, res) => {
  const { correo, password } = req.body;

  const usuario = await Usuario.findOne({ correo });

  
  const passwordGuardada = usuario.password;
  
  //Verificar si las contraseñas son iguales
  const isEqualsPassword = await bcryptjs.compare(password, passwordGuardada);
  
  if (isEqualsPassword) {
    const id = usuario._id; //Obtengo el id
    //Generar jwt
    const token = jsonwebtoken.sign({ _id: id, correo }, process.env.CLAVE_SECRETA, {
      expiresIn: "24h",
    });
    return res.status(200).json({ msg: "Usuario logeado correctamente" ,token});
  } else {

    return res.status(401).json({ msg: "Acceso denegado - correo o la contraseña incorrectos" });
  }
};

