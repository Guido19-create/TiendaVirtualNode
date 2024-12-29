import { subirArchivo } from "../helpers/cargarArchivo.js";
import { Producto } from "../models/mongoDB/Productos.js";
import { Categoria } from "../models/mongoDB/Categorias.js";


export const agregarProductos = async (req, res) => {
  const {
    nombre,
    precio,
    categoria,
    cantidadDisponible,
    descripcion = "",
  } = req.body;

  const { _id: usuario } = req.payload;

  const imagen = Array.isArray(req.files.imagen)
    ? req.files.imagen
    : [req.files.imagen];

  const urlImagenProductos = [];

  try {
    for (let i of imagen) {
      urlImagenProductos.push(await subirArchivo(i.tempFilePath, "Productos"));
    }

    const producto = {
      nombre,
      precio,
      categoria,
      fotoDelProducto: urlImagenProductos,
      cantidadDisponible,
      usuario,
      descripcion,
    };

    const productoCreado = new Producto(producto);
    await productoCreado.save();

    return res
      .status(201)
      .json({ msg: "Producto creado exitosamente!!", productoCreado });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const obtenerProductosPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const productos = await Producto.find({ nombre: new RegExp(nombre, "i") });

    if (productos.length != 0) {
      return res.status(200).json({ resultados: productos });
    }

    return res
      .status(404)
      .json({ msg: `No se encontro ningun producto de nombre ${nombre}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const obtenerProductosPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  const categoriaCapitalizado = categoria.toUpperCase();

  try {
    const categoriaEncontrada = await Categoria.findOne({
      nombre: categoriaCapitalizado,
    });

    if (!categoriaEncontrada) {
      return res
        .status(404)
        .json({
          resultados: `No se encontro ninguna categoria llamada ${categoria}`,
        });
    }

    const productos = await Producto.find({
      categoria: categoriaEncontrada._id,
    });

    if (productos.length != 0) {
      return res.status(200).json({ resultados: productos });
    }

    return res
      .status(404)
      .json({
        msg: `No se encontro ningun producto de categoria ${categoria}`,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const obtenerProductosPaginados = async ( req, res ) => {
    const { limite = 10, page = 1 } = req.query;
    
    try {
        const productos = await Producto.find().skip((page - 1) * limite).limit(limite);
        
        if (productos.length != 0) {
            return res.status(200).json({resultados: productos});
        }
        
        return res.status(404).json({resultados: 'No hay ningun producto'});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

}

export const obtenerProductosDeUnUsuario = async ( req, res ) => {
    const { _id : usuario} = req.payload;

    try {
        const productos = await Producto.find({usuario});
        
        if (productos.length != 0) {
            return res.status(200).json({resultados: productos});
        }
        
        return res.status(404).json({resultados: 'Usted no ha publicado ningun producto'});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

}

export const actualizarProducto = async (req, res) => {
  const { producto, ...resto } = req.body;

  const { _id: usuario } = req.payload;


  if (!req.files || Object.keys(req.files) === 0) {
    try {
        const prodActualizado = await Producto.updateOne({ _id: producto, usuario },resto);
    
        if (prodActualizado.modifiedCount != 0) {
          return res.status(201).json({ msg: "Producto Actualizado" });
        }
    
        return res.status(400).json({msg: `El usuario ${usuario} no puede actualizar este producto porque no lo posteo el`,});
        
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


//Esto es si la imagen existe
const imagen = Array.isArray(req.files.imagen)? req.files.imagen : [req.files.imagen];

const urlImagenProductos = [];

try {
    
    for (let i of imagen) {
      urlImagenProductos.push(await subirArchivo(i.tempFilePath, "Productos"));
    }

    const productoActualizacion = resto;

    productoActualizacion.fotoDelProducto = urlImagenProductos;

    const prodActualizado = await Producto.updateOne({ _id: producto, usuario },productoActualizacion);

    if (prodActualizado.modifiedCount != 0) {
      return res.status(201).json({ msg: "Producto Actualizado" });
    }

    return res.status(400).json({msg: `El usuario ${usuario} no puede actualizar este producto porque no lo posteo el`,});


  } catch (error) {
    return res.status(500).json({error: error.message});
  }

};

export const eliminarProducto = async ( req, res ) => {
    const { producto } = req.params;

    const { _id : usuario } = req.payload;

    try {
        const productoEliminado = await Producto.deleteOne({ _id : producto , usuario });

        if (productoEliminado.deletedCount != 0) {
            return res.status(200).json({msg:'Producto eliminado'});
        }
        
        return res.status(404).json({msg:'Este usuario no puede eliminar porque no tiene ningun producto'});
        

    } catch (error) {
        return res.status(500).json({error: error.message});  
    }
};



