import { Router } from "express";
import { check } from "express-validator";
import { agregarProductos } from "../controllers/Producto.controllers.js";
import { User } from "../models/mySql/User.js";

const router = Router();


//Agregar Productos
router.post('/' , agregarProductos);

//Actualizar producto
router.post('/agregar' , async(req , res)=>{

    const {name, age} = req.body;
    await User.sync();
    const jane = User.create({nombre: name, edad:age});

    

    res.json({msg:'Usuario creado correctamente'});
 
});

//Eliminar producto
router.delete('/:id' , (req , res)=>{

    res.send('hello from simple server :)')
 
});

//Obtener producto por id
router.get('/:id' , (req , res)=>{

    res.send('hello from simple server :)')
 
});

//Obtener productos paginados
router.get('/' , (req , res)=>{

    res.send('hello from simple server :)')
 
});


//Obtener productos de una categoria especifica
router.get('/:categoria' , (req , res)=>{

    res.send('hello from simple server :)')
 
});


//Busca de productos por nombre
router.get('/:id' , (req , res)=>{

    res.send('hello from simple server :)')
 
});


//Agregar una valoracion a un producto  



export { router };