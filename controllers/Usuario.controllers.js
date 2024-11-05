import bcryptjs from "bcryptjs";
import { Usuario } from "../models/Usuarios.js";
import { hashearPass } from "../helpers/hashearPassword.js";
import { populate } from "dotenv";
import path from 'path'
import {fileURLToPath} from 'url'
import {v4 as uuidv4} from 'uuid';
import { subirArchivo } from "../helpers/cargarArchivo.js";
uuidv4();

import dotenv from 'dotenv';
dotenv.config();  // Asegúrate de que esta línea esté primero


import cloudinary from 'cloudinary';
//cloudinary.v2.config(process.env.CLOUDINARY_URL);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



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

  try{
    await Usuario.findByIdAndUpdate(id,{estado:false});
    return res.status(200).json({msg:'Usuario eliminado correctamente'});
  } catch (err){
    return res.status(500).json({msg:'No se pudo eliminar al usuario',err});
  }

};




export const establecerFotoPerfil = async (req, res) => {
  try {
    const { imagen } = req.files; // Suponiendo que la imagen se llama "imagen" en el formulario
    

    // Subir la imagen a la carpeta "fotoPerfil"
    const resultado = await cloudinary.v2.uploader.upload(imagen.tempFilePath, {
      folder: 'fotoPerfil', // Carpeta de fotos de perfil
    });

    res.json({
      msg: 'Imagen de perfil subida correctamente',
      url: resultado.secure_url, // URL de la imagen en Cloudinary
    });
  } catch (error) {
    console.error('Error al subir imagen de perfil:', error);
    res.status(500).json({ msg: 'Error al subir imagen de perfil' });
  }
  
};

