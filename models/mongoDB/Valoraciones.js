import { Schema,model } from "mongoose";

const ValoracionSchema = new Schema({
    descripcion: {
        type:String,
        required:true
    },
    calificacion: {
        type: Number,
        required:true
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref:'Usuario',
        required:true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required:true
    }
});

ValoracionSchema.methods.toJSON = function () {
    const {__v,...resto} = this.toObject();
    return resto;
}


const Valoracion = model('Valoracion',ValoracionSchema,'valoraciones');

export { Valoracion };