import { Router } from 'express';
import { verificarToken } from '../middlewares/validar-token.js';
import { verificarUsuarioActivo } from '../middlewares/existe-Usuario.js';
import { check } from 'express-validator';
import { resultadoValidaciones } from '../middlewares/resultado-validaciones.js';
import { existeProducto, existeValoracion } from '../middlewares/validacionesValoraciones.js';
import { 
    actualizarValoracion,
    agregarValoracion,
    eliminarValoracion,
    obtenerValoracionesDeUnProducto 
} from '../controllers/valoracion.controllers.js';

const router = Router();

//Middlewares globales para las rutas del valoraciones
router.use(verificarToken);
router.use(verificarUsuarioActivo);

//Agregar una valoracion 
router.post('/',[
    check('calificacion','La calificacion es obligatoria').notEmpty(),
    check('calificacion','La calificacion tiene que ser de tipo (INT) entre 0 y 5').isInt({min:0, max:5}),
    check('descripcion','La descripcion es obligatoria').notEmpty(),
    check('descripcion','La calificacion tiene que ser de tipo (String)').isString(),
    check('producto','El producto es obligatorio').notEmpty(),
    check('producto','El producto tiene que ser un id de mongo').isMongoId(),
    resultadoValidaciones,
    existeProducto,
    existeValoracion    
],agregarValoracion);

//Obtener valoraciones de un producto
router.get('/:producto',[
    check('producto','El id del producto tiene que ser obligatorio').notEmpty(),
    check('producto','El id del producto tiene que ser un id de mongo').isMongoId(),
    resultadoValidaciones,
    existeProducto
],obtenerValoracionesDeUnProducto);

//Eliminar valoracion 
router.delete('/:producto',[
    check('producto','El id del producto tiene que ser obligatorio').notEmpty(),
    check('producto','El id del producto tiene que ser un id de mongo').isMongoId(),
    resultadoValidaciones,
    existeProducto
],eliminarValoracion);

//Actualizar valoracion
router.put('/',[
    check('producto','El id del producto tiene que ser obligatorio').notEmpty(),
    check('producto','El id del producto tiene que ser un id de mongo').isMongoId(),
    check('calificacion','La calificacion tiene que ser un entero entre 0 y 5').optional().isInt({min:0,max:5}),
    check('descripcion','La descripcion tiene que ser de tipo String').optional().isString(),
    resultadoValidaciones,
    existeProducto
],actualizarValoracion);



export { router };