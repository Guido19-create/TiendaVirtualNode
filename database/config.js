import mongoose from "mongoose";

export const conexionDB = async() => {

    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Conexion establecida con la Base Datos');
    }catch(err){
        console.log('No se puede establecer la conexion con la Base Datos');
        console.log(err);
    }

}