import { Usuario } from "../models/mongoDB/Usuarios.js";


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


//Este middleware es para el apartado de la autenticacion osea del login
export const buscarSiExisteUsuario = async( req, res, next ) => {

    const { correo } = req.body;

    const users = await Usuario.find({correo});
    

    //Verificar si el usuario existe
    if( users.length === 0){
        return res.status(400).json({msg: 'El correo o la contraseña son invalidos'})  //El Usuario no existe
    } 
    
    //Verificar el estado del usuario
    for(let usuario of users){
        if (usuario.estado) {
            return next();
        }
    }
    
    res.status(400).json({msg: 'El correo o la contraseña son invalidos'})  //El Usuario no existe
}

