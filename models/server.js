import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'
import {router} from '../routers/auth.js'
import {router as UsuarioRutas}  from '../routers/UsuarioRouters.js';
import { conexionDB } from '../database/config.js'

dotenv.config()


export class Server{

    constructor(){
        this.app = express()

        //Configurando el dirname para las rutas absolutas
        this.__filename = fileURLToPath(import.meta.url)
        this.__dirname = path.dirname(this.__filename)

        //Rutas urls de la api
        this.paths = {
            auth:'/api/auth',
            crudUsuario: '/api/Usuario'
        }

        //Iniciando middlewares
        this.Middlewares();

        //Iniciando rutas 
        this.routes();

        //Iniciar conexion con la base de datos
        this.conectarDB()
        
    }


    //Rutas
    routes(){
        this.app.use(this.paths.auth,router);
        this.app.use(this.paths.crudUsuario,UsuarioRutas);
    }

    //Middlewares
    Middlewares(){
        this.app.use(express.json())

    }

    async conectarDB(){
        await conexionDB();
    }

    //conexion con pa base datos 

    //Escuchando el servidor
    listen(){
        this.app.listen(process.env.PORT,'0.0.0.0',() => {
            console.log(`Servidor Activo en http://localhost:${process.env.PORT}`);
        })
    }

}