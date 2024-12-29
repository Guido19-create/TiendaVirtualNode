import { Producto } from "../models/mongoDB/Productos.js"; 
import { Valoracion } from "../models/mongoDB/Valoraciones.js";

export const existeProducto = async( req, res, next ) => {
    const  producto  = req.body.producto || req.params.producto;
    
    try {
        const productoEncontrado = await Producto.findById( producto );

        if (productoEncontrado) {
            return next()
        }

        return res.status(400).json({msg:`No se ha encontrado ningun producto con id: ${producto}`});

    } catch (error) {
        return res.status(500).json({error});
    }
    
}


export const existeValoracion = async ( req , res , next ) => {
    const { _id: usuario } = req.payload;

    const { producto } = req.body;

    try {
        const valoracion = await Valoracion.findOne({ usuario, producto });
 
        if ( !valoracion ) {
            return next()
        }

        return res.status(409)
        .json({msg:'No se puede agregar la valoracion porque este usuario ya valoro este producto'});

    } catch (error) {
        return res.status(500).json({error});       
    }

};

