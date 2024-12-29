import { Categoria } from "../models/mongoDB/Categorias.js"

export const isUnicaLaCategoria = async( req, res, next ) => {
    const { nombreCategoria } = req.body;

    const nombreCategoriaCapitalizado = nombreCategoria.toUpperCase();

    try {
        const categoria = await Categoria.findOne({nombre:nombreCategoriaCapitalizado});
    
        if (!categoria) {
            return next() 
        }
    
        return res.status(409).json({msg: `La categoria ${nombreCategoriaCapitalizado} ya existe, no se puede agregar`});
        
    } catch (error) {
        
        return res.status(500).json({error});
    }
    
};


export const existeCategoria = async( req, res, next ) => {
    const { categoria:idCategoria } = req.body;

    try {
        const categoriaEncontrada = await Categoria.findById(idCategoria);

        if (categoriaEncontrada) {
            return next()
        }

        return res.status(400).json({msg:`La categoria con id: ${idCategoria} no existe`});
        
    } catch (error) {
        return res.status(500).json({error});
    }
};