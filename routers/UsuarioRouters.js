import { Router } from "express";
import { check } from "express-validator";
import { verificarToken } from "../middlewares/validar-token.js";
import {resultadoValidaciones} from '../middlewares/resultado-validaciones.js';
import { validarRol } from "../middlewares/rol-valido.js";
import { validarID, verificarUsuarioActivo } from "../middlewares/existe-Usuario.js";
import {cantidadArchivosPermitidos, verificarCargaDeArchivo} from '../middlewares/verificacionArchivo.js';
import { validarExtensionesPermitidas } from "../middlewares/validarExtensiones.js";

import { 
    actualizarPassword,
    eliminarUsuario,
    obtenerUsuariosPaginados, 
    obtenerUsuariosPorId,
    establecerFotoPerfil,
    buscarUsuarioPorCorreo
} from "../controllers/Usuario.controllers.js";


const router = Router();

//Middlewares globales para las rutas del usuario
router.use(verificarToken);
router.use(verificarUsuarioActivo);

//cambiar contraseña
router.post('/updatePassword',[
    check('password','La contraseña tiene que ser un String').isString(),
    check('newPassword','La contraseña tiene que ser un String').isString(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('newPassword','La contraseña nueva es obligatoria').not().isEmpty(),
    check('newPassword','La constraseña tiene que ser minimo de 8 digitos').isLength({min:8}),
    resultadoValidaciones
 ], actualizarPassword);
 

//Obtener los usuarios --se necesita rol de ADMINISTRADOR --apartado de el Dashboard
router.get('/',[
    validarRol("ADMINISTRADOR"),
    resultadoValidaciones
],obtenerUsuariosPaginados);


//Obtener los usuarios por id --se necesita rol de ADMINISTRADOR
router.get('/:id',[
    check('id','Esto no es un id de Mongo DB').isMongoId(),
    resultadoValidaciones,
    validarID,
    validarRol("ADMINISTRADOR"),
    resultadoValidaciones
], obtenerUsuariosPorId);

//Establecer foto de perfil
router.put('/',[
    verificarCargaDeArchivo,
    cantidadArchivosPermitidos(1),
    validarExtensionesPermitidas(['jpg','png'])
], establecerFotoPerfil);

//Eliminar Usuario
router.delete('/:id',[
    check('id','Esto no es un id de Mongo DB').isMongoId(),
    validarID,
    validarRol("ADMINISTRADOR"),
    resultadoValidaciones
],eliminarUsuario );


//Buscar Usuario por correo
router.get('/correo/:correoUsuario', [
    validarRol("ADMINISTRADOR"),
    resultadoValidaciones
],buscarUsuarioPorCorreo);


export { router }