import { Router } from 'express';
import { check } from "express-validator";
import { resultadoValidaciones } from '../middlewares/resultado-validaciones.js';
import { verificarToken } from '../middlewares/validar-token.js';
import { verificarUsuarioActivo } from '../middlewares/existe-Usuario.js';
import { isUnicaLaCategoria } from '../middlewares/validacionesCategoria.js';
import {
    crearCategoria, 
    eliminarCategoria, 
    obtenerCategoriaPorNombre, 
    obtenerCategorias 
} from '../controllers/categoria.controllers.js';

const router = Router();

//Agregar categoria
router.post('/',[
    verificarToken,
    verificarUsuarioActivo,
    check('nombreCategoria','El nombre de la categoria es obligatorio').notEmpty(),
    check('nombreCategoria','El nombte de la categoria tiene que ser de tipo String').isString(),
    resultadoValidaciones,
    isUnicaLaCategoria
],crearCategoria);

//Obtener categoria por nombre
router.get('/:nombre',[
    verificarToken,
    verificarUsuarioActivo
],obtenerCategoriaPorNombre);

//Obtener todas las categorias
router.get('/',[
    verificarToken,
    verificarUsuarioActivo
],obtenerCategorias);

//Eliminar categoria
router.delete('/',[
    verificarToken,
    verificarUsuarioActivo
],eliminarCategoria);

export { router }