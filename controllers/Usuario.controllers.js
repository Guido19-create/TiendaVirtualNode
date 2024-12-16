import bcryptjs from "bcryptjs";
import { Usuario } from "../models/mongoDB/Usuarios.js";
import { hashearPass } from "../helpers/hashearPassword.js";
import { populate } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { eliminarArchivo, subirArchivo } from "../helpers/cargarArchivo.js";
import { obtenerNombreURL } from "../helpers/obtenerNombreImagen.js";
uuidv4();


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

    return res
      .status(201)
      .json({ msg: "Contraseña actualizada correctamente" });
  } else {
    return res.status(401).json({
      msg: "No se puede actualizar la contraseña  - contraseña incorrecta",
    });
  }
};

export const obtenerUsuariosPorId = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findOne({ _id: id }).populate("rol");

  usuario
    ? res.status(200).json({ resultados: usuario })
    : res.status(404).json({ msg: "No se encontro ningun usuario con ese id" });
};

export const obtenerUsuariosPaginados = async (req, res) => {
  const { limite, desde = 0 } = req.query;

  if (limite) {
    const usuarios = await Usuario.find()
      .populate("rol")
      .limit(Number(limite))
      .skip(Number(desde));
    return res.status(200).json({ resultados: usuarios });
  } else {
    const usuarios = await Usuario.find().populate("rol");

    return res.status(200).json({ resultados: usuarios });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.findByIdAndUpdate(id, { estado: false });
    return res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (err) {
    return res.status(500).json({ msg: "No se pudo eliminar al usuario", err });
  }
};

export const establecerFotoPerfil = async (req, res) => {
  const { imagen } = req.files;

  const { _id } = req.payload;

  try {
    const usuario = await Usuario.findById(_id);
    if (usuario.fotoDePerfil) {

      const nombreImg = obtenerNombreURL(usuario.fotoDePerfil);

      await eliminarArchivo(nombreImg, "Foto de Perfil");
    }

    const URL = await subirArchivo(imagen.tempFilePath, "Foto de perfil");

    //Guardar en la base de datos
    usuario.fotoDePerfil = URL;
    usuario.save();

    res.json({
      msg: "Imagen de perfil subida correctamente",
      URL, // URL de la imagen en Cloudinary
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al subir imagen de perfil", error });
  }
};


export const buscarUsuarioPorCorreo = async ( req, res ) => {
  const {correoUsuario} = req.params;

  const expresionRegular = new RegExp(correoUsuario);

  const resultadosEncontrados = await Usuario.find({correo:expresionRegular});

  if (resultadosEncontrados.length != 0) {
    return res.status(200).json({
      resultadosEncontrados:resultadosEncontrados.length,
      resultados: resultadosEncontrados
    });
  }

  return res.status(404).json({resultados: 'No se encontro ninguna coincidencia con ese correo o sus parecidos'});
};