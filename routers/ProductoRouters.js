import { Router } from "express";
import { check } from "express-validator";
import { validarExtensionesPermitidas } from "../middlewares/validarExtensiones.js";
import { verificarToken } from "../middlewares/validar-token.js";
import {resultadoValidaciones} from '../middlewares/resultado-validaciones.js';
import {cantidadArchivosPermitidos, verificarCargaDeArchivo} from '../middlewares/verificacionArchivo.js';
import { existeCategoria } from "../middlewares/validacionesCategoria.js";
import { verificarUsuarioActivo } from "../middlewares/existe-Usuario.js";
import { existeProducto } from "../middlewares/validacionesValoraciones.js";
import { Categoria } from "../models/mongoDB/Categorias.js";
import {
    actualizarProducto,
    agregarProductos,
    eliminarProducto,
    obtenerProductosDeUnUsuario,
    obtenerProductosPaginados,
    obtenerProductosPorCategoria,
    obtenerProductosPorNombre 
} from "../controllers/Producto.controllers.js";


const router = Router();

//Middlewares globales para las rutas del producto
router.use(verificarToken);
router.use(verificarUsuarioActivo);



//Agregar Productos
router.post('/',[
    verificarCargaDeArchivo,
    cantidadArchivosPermitidos(5),
    validarExtensionesPermitidas(['jpg','png','jpeg']),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre','El nombre tiene que ser un string').isString(),
    check('precio','El precio es obligatorio').notEmpty(),
    check('precio','El precio tiene que ser de tipo Float de minimo 0').isFloat({min:0}),
    check('descripcion','La descripcion tiene que ser un string').optional().isString(),
    check('categoria','La categoria es obligatoria').notEmpty(),
    check('categoria','La categoria tiene que ser un id de mongo').isMongoId(),
    check('cantidadDisponible','La cantidad disponible del producto es obligatoria').notEmpty(),
    check('cantidadDisponible','La cantidad disponible tiene que ser un entero mayor o igual que 1').isInt({min:1}),
    resultadoValidaciones,
    existeCategoria
],agregarProductos);




//Actualizar producto
router.put('/' ,[
    check('producto','El id del producto tiene que ser obligatorio').notEmpty(),
    check('producto','El id del producto tiene que ser un id de mongo').isMongoId(),
    check('nombre','El nombre del producto tiene que ser un string').optional().notEmpty(),
    check('descripcion','La descripcion tiene que ser un String').optional().isString(),
    check('precio','El precio tiene que ser mayor o igual a 0').optional().isFloat({min:0}),
    check('cantidadDisponible','La cantidad disponible tiene que ser un entero mayor que 0').optional().isInt({min:1}),
    check('categoria','La categoria tiene que ser un id de Mongo DB').optional().isMongoId().custom( async ( id ) => {
        const categoriaEncontrada = await Categoria.findById(id);
        console.log(categoriaEncontrada);
        if ( categoriaEncontrada ) {
            return true
        }
        throw new Error(`No se encontro la categoria con id: ${id}`);
    }),
    resultadoValidaciones,
    existeProducto,
    cantidadArchivosPermitidos(5),
    validarExtensionesPermitidas(['jpg','png','jpeg'])
],actualizarProducto);



//Eliminar producto
router.delete('/:nombre' , );



//Obtener producto por nombre
router.get('/:nombre',[
    check('nombre','El nombre tiene que ser de tipo string').isString(),
    resultadoValidaciones
], obtenerProductosPorNombre);



//Obtener productos de una categoria especifica
router.get('/tipo/:categoria',[
    check('categoria','La categoria tiene que ser de tipo string').isString(),
    resultadoValidaciones
],obtenerProductosPorCategoria);


//Obtener todos los productos de forma paginada
router.get('/',[
    check('limite').optional().isInt({min:1}),
    check('page').optional().isInt({min:1}),
    resultadoValidaciones
],obtenerProductosPaginados);


//Obtener todos los productos publicados por un usuario
router.get('/usuario/publicaciones',obtenerProductosDeUnUsuario);


//Eliminar productos
router.delete('/:producto',[
    check('producto','El id del producto es obligatorio').notEmpty(),
    check('producto','El producto tiene que ser un id de mongo').isMongoId(),
    resultadoValidaciones,
    existeProducto
],eliminarProducto);



export { router };