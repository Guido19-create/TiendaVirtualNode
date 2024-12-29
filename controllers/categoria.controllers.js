import { Categoria } from "../models/mongoDB/Categorias.js";

export const crearCategoria = async ( req , res ) => {
    const { nombreCategoria } = req.body;

    const nombreCategoriaCapitalizado = nombreCategoria.toUpperCase();

    const categoria = new Categoria({ nombre: nombreCategoriaCapitalizado });

    try {
        await categoria.save();
        res.status(201).json({msg:'Se ha creado la categoria exitosamente',categoria});
    } catch (error) {
        res.status(500).json({error});
    }
}


export const obtenerCategoriaPorNombre = async ( req, res ) => {
    const { nombre } = req.params;

    const nombreCategoriaCapitalizado = nombre.toUpperCase();

    try {
        const categoria = await Categoria.findOne({nombre:nombreCategoriaCapitalizado});
    
        if (categoria) {
            return res.status(200).json({ categoria });
        }
    
        return res.status(404).json({msg: `La categoria ${nombreCategoriaCapitalizado} no existe`});
        
    } catch (error) {
        return res.status(500).json({error});
    }

};


export const obtenerCategorias = async( req, res ) => {
    try {
        const categorias = await Categoria.find();
    
        if (categorias.length > 0) {
            return res.status(200).json({resultados: categorias});
        }
        return res.status(404).json({resultados:'No hay ninguna categoria'});
        
    } catch (error) {
        return res.status(500).json({error});
    }
};

export const eliminarCategoria = async ( req, res ) => {
    const { nombreCategoria } = req.body;

    const nombreCategoriaCapitalizado = nombreCategoria.toUpperCase();

    try {
        const categoria = await Categoria.findOne({nombre:nombreCategoriaCapitalizado})

        if (categoria) {
            const categoriaEliminada = await Categoria.deleteOne({nombre:nombreCategoriaCapitalizado});
            return res.status(200).json({msg:'Categoria eliminada'});
        }
        return res.status(404).json({msg:`La categoria ${nombreCategoriaCapitalizado} no existe`});
    } catch (error) {
        res.status(500).json({error});
    }
};