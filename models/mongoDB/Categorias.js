import {Schema, model} from 'mongoose';

const SchemaCategoria = new Schema({
    nombre: {
        type: String, 
        required: true
    }
});

SchemaCategoria.methods.toJSON = function () {
    const {__v,...resto} = this.toObject();

    return resto;

}

const Categoria = model('Categoria',SchemaCategoria);

export{ Categoria }