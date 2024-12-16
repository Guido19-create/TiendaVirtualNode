import { Schema, model } from "mongoose";


const SchemaProductos = new Schema({
    nombre: {
        type:String,
        required:true
    },
    precio:{
        type: Number,
        required:true
    },
    fotoDelProducto: {
        type:String
    },
    cantidadDisponible:{
        type: Number,
        required:true
    },
    valoracion: [{type: Schema.Types.ObjectId,
        ref:'Valoraciones'}],
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias'
    }

});

const Producto = model('Producto', SchemaProductos);

export{ Producto }