import jsonwebtoken from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const token = req.header('token');

    //verificar si viene el token
    if (!token) {
        return res.status(401).json({msg: 'No esta autorizado a este sitio - No hay token en la peticion'});
    }

    //validar si es un token valido
    try{
        const payload = jsonwebtoken.verify(token,process.env.CLAVE_SECRETA);
        req.payload =payload; //estableciendo en la request el payload
        
        next();
    } catch (err) { 
        return res.status(401).json({msg: 'No esta autorizado a este sitio -El token no es valido'})
    }

}