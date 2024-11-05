import { Usuario } from "../models/Usuarios.js";



export const verificarUsuarioActivo = async( req, res, next ) => {

    const { correo } = req.payload;

    const usuarios = await Usuario.find({correo});


    for ( let user of usuarios ) {
        if ( user.estado ) {
            return next()
        }
    }

    return res.status(400).json({msg: 'El usuario que quiere acceder a la ruta ya no existe'});

};


export const validarID = async( req, res, next ) => {
    const { id } = req.params;

    const user = await Usuario.findOne({_id:id});

    if (user) {
        return next()
    }

    return res.status(400).json({msg:'El id del usuario a eliminar no existe'});

};

