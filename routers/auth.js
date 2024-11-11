import { Router } from "express";
import { check } from "express-validator";
import { iniciarSesion, registrar} from "../controllers/auth.controllers.js";
import { resultadoValidaciones } from "../middlewares/resultado-validaciones.js";
import { existeCorreo } from "../helpers/validar-email.js";
import { buscarSiExisteUsuario } from "../middlewares/existe-Usuario.js";

const router = Router()

//Registrar al usuario
router.post('/registrar',[
   check('correo','El correo tiene que ser un String').isString(),
   check('password','La contraseña tiene que ser un String').isString(),
   check('correo','El correo es obligatorio').not().isEmpty(),
   check('password','La contraseña es obligatoria').not().isEmpty(),
   check('correo','El correo no es un email valido').isEmail(),
   check('correo').custom(existeCorreo),
   check('password','La constraseña tiene que ser minimo de 8 digitos').isLength({min:8}),
   resultadoValidaciones
], registrar);

//Iniciar sesion
router.post('/login',[
   check('correo','El correo tiene que ser un String').isString(),
   check('password','La contraseña tiene que ser un String').isString(),
   check('correo','El correo es obligatorio').not().isEmpty(),
   check('password','La contraseña es obligatoria').not().isEmpty(),
   check('correo','El correo no es un email valido').isEmail(),
   buscarSiExisteUsuario,
   resultadoValidaciones
], iniciarSesion);


export { router }