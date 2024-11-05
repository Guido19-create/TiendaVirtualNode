import cloudinary from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL);

export const subirArchivo = async (rutaArchivo) => {

    try{
        const respuesta = await cloudinary.v2.uploader.upload(rutaArchivo);
    
        console.log(respuesta)
        const src = respuesta.secure_url;
        console.log(src)
        return src;

    } catch (err) {
        return new Error(err);
    }

}