
//const jwt2 = require('jwt-simple');
//import jwt from 'jwt-simple';
//import  {jwt}  from 'jwt-simple';
import * as jwt  from 'jwt-simple';
const jwt2 = require('jwt-simple');
const moment2 = require('moment');

/* if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
 */
require('dotenv').config();

const miSecretToken2 = 'token red social Angular';
const secretKey = process.env.SECRET_TOKEN || miSecretToken2;
//const secretKey = miSecretToken2;

exports.devolver=()=>{
    const mo1 = moment2("Nov 22th, 2009", "MMM-DD-YYYY"); 
    console.log('SECRETA',secretKey);
    console.log('port',process.env.PORT);
    
    return  mo1.fromNow();
}

exports.isAuth = (req: any, res: any, next: any) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: 'la peticion no tiene cabecera' })
    }
    // / / / / / / / / / / / / / / /reemplaza comillas simples y dobles, en todo el string g, por nada
    const token = req.headers.authorization.replace(/['"]+/g,'');
    const token1 = req.headers.authorization;
    /*selecciona token de la cabecera y le hace split por espacio, guardo la parte 
    [1]del array , no uso el[0} que llamado bearer*/
    const token2 = req.headers.authorization.split(".")[3];
  
    console.log('token',token);

   /*   NO ANDA METODO1, USO  //METODO 2
   // //METODO 1
    decodeToken2(token)
    .then((respuesta)=>{
        console.log(respuesta);
        req.usu=respuesta;
    }).catch((resp)=>{
        console.log(resp);
        res.send(resp)
    }).finally(() => console.log('Fin promesa'));   
     */

     //METODO 2 ANDA
     
     try {
        var payload =  jwt.decode(token, secretKey);
     
       // if(payload.exp <= moment().unix()){
        if(payload.name===''){
            return ({status: 401, message: 'El token ha expirado'});
        }    
        
     } catch (error) {
        return res.status(404).send({message: 'Ivalid token',err:error });
     }
////le pasamos todo el objeto usuario al parametro req para usarlo despues
      req.user =payload; 

      console.log('Datos del Usu Logueado ---->');
      console.log('EXPIRADO,',payload.exp);
      console.log('SUB,',payload.sub);
      console.log('payload',payload);
      console.log('Name',req.user.name);
      console.log('-------');
      
     next();
     
   
}


const decodeToken2 = async (token: string) => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, secretKey)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)  //es el id del usuario    
        } catch (error) {
            reject({
                status: 404, message: 'Ivalid'
            });
        }
    })
    return decoded;
}
    
const decodeToken1 = async (token: string) => {
    // DECODIFICA Rel token de la cabecera + secret para abtener el payload 
    try {
        const payload = await jwt.decode(token, secretKey);

        if (payload.exp <= moment().unix()) {
            /* console.log('status: 401, message: El token ha expirado');
            return res.status(401).send({message: 'El token ha expirado' });  */
           
            return ({status: 401, message: 'El token ha expirado'});
        }
        //return payload;
    } catch (error) {
        /* console.log('status: 404, message: \nIvalid token,err:error');
        return res.status(404).send({message: 'Ivalid token',err:error });  */
        //return 'status: 404, message: \nIvalid token,err:error';
        return ({status: 404, message: '\nIvalid token'});
    }
}

