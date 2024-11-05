

export const verificarCargaDeArchivo = ( req , res, next) => {
    if(!req.files || Object.keys(req.files) === 0) {
        return res.status(400).json({msg: 'No se ha subido ningun archivo'});
    }
    next()
};