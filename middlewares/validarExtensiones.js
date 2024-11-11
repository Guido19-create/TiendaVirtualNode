import { obtenerExtensionURL } from "../helpers/obtenerNombreImagen.js";

export const validarExtensionesPermitidas = (extensiones) => {
  return (req, res, next) => {
    const { imagen } = req.files;

    const extension = obtenerExtensionURL(imagen.name);

    if( extensiones.includes(extension) ) {
        return next()
    }

    return res.status(400).json({msg: 'Extension del archivo no valida'});
    
  };
};
