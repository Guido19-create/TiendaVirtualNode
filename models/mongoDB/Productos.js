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
    descripcion: {
        type:String
    },
    fotoDelProducto: {
        type:[String],
        required:true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias',
        required:true
    },
    cantidadDisponible:{
        type:String,
        required:true
    },
    fechaDeCreacion:{
        type:Date,
        default: Date.now()
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }

});

SchemaProductos.methods.toJSON = function () {
    const {__v,...resto} = this.toObject();
    return resto;
}

const Producto = model('Producto', SchemaProductos);

export{ Producto }