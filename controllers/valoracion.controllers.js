import { Producto } from "../models/mongoDB/Productos.js";
import { Valoracion } from "../models/mongoDB/Valoraciones.js";


export const agregarValoracion = async ( req, res ) => {
    const { descripcion , calificacion, producto } = req.body;

    const { _id : usuario} = req.payload;

    const valoracion = new Valoracion({ descripcion, calificacion, usuario, producto });

    try {
        await valoracion.save();
        return res.status(201).json({msg:'Se ha creado una valoracion nueva'});
    } catch (error) {
        return res.status(500).json({error});
    }
};


export const obtenerValoracionesDeUnProducto = async ( req, res ) => {
    const { producto } = req.params;
    
    try {
        const valoraciones = await Valoracion.find({producto});
        
        if (valoraciones.length != 0) {
            return res.status(200).json({resultados: valoraciones});
        }
        
        return res.status(404).json({resultados: 'Sin valoraciones'});
        
    } catch (error) {
        return res.status(500).json({error});
    }
    
};


export const eliminarValoracion = async ( req, res ) => {
    const { producto } = req.params;

    const {_id:usuario} = req.payload;

    try {
        const valoracionEliminada = await Valoracion.deleteOne({ producto, usuario });

        if (valoracionEliminada.deletedCount != 0) {
            return res.status(200).json({msg:'Valoracion eliminada'});
        }
        
        return res.status(404).json({msg:`Este usuario no tiene ninguna valoracion en el producto ${producto}`});
        
    } catch (error) {
        return res.status(500).json({error});
    }
    
};



export const actualizarValoracion = async ( req, res ) => {
    const { _id: usuario } = req.payload;

    const { producto, ...resto } = req.body;

    try {
        const valoracionActualizada = await Valoracion.updateOne({producto, usuario},resto);
        
        if (valoracionActualizada.modifiedCount != 0) {
            return res.status(201).json({msg: 'Valoracion Actualizada'});

        }
        return res.status(404).json({msg:`Este usuario no tiene ninguna valoracion en el producto ${producto}`});
        
    } catch (error) {
        return res.status(500).json({error});
    }


};