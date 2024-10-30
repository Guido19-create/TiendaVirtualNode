import { Router } from "express";
import { check } from "express-validator";
import { verificarToken } from "../middlewares/validar-token.js";
import {resultadoValidaciones} from '../middlewares/resultado-validaciones.js';
import { actualizarPassword,obtenerUsuarios } from "../controllers/Usuario.controllers.js";


const router = Router();

//cambiar contraseña
router.post('/updatePassword',[
    verificarToken,
    check('password','La contraseña tiene que ser un String').isString(),
    check('newPassword','La contraseña tiene que ser un String').isString(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('newPassword','La contraseña nueva es obligatoria').not().isEmpty(),
    check('newPassword','La constraseña tiene que ser minimo de 8 digitos').isLength({min:8}),
    resultadoValidaciones
 ], actualizarPassword);
 

//Obtener los usuarios --se necesita rol de ADMINISTRADOR
router.get('/get', obtenerUsuarios);

//Obtener los usuarios por id --se necesita rol de ADMINISTRADOR
router.get('/:id', );

//Obtener los usuario de forma paginada --se necesita rol de ADMINISTRADOR
router.get('/', );

//Establecer foto de perfil
router.post('/:id', );

//Eliminar Usuario
router.delete('/:id', );


export { router }