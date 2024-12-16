import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config(); // Asegúrate de que esta línea esté primero

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const subirArchivo = (rutaArchivo,carpeta) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Subir la imagen a la carpeta "fotoPerfil"
      const resultado = await cloudinary.v2.uploader.upload(rutaArchivo, {
        folder: carpeta, // Carpeta de fotos de perfil
      });

      resolve(resultado.secure_url);
    } catch (err) {
      reject(err);
    }
  });
};


export const eliminarArchivo = (NombreID,carpeta) => {

  return new Promise(async (resolve,reject) => {
    try{
      await cloudinary.uploader.destroy(`${carpeta}/${NombreID}`);
      resolve('Archivo Eliminado')
    } catch (err) {
      reject(err);
    }
  });

}