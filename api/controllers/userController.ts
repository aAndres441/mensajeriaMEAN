'use strict';
//const UsuarioModel = require('../models/userModel');
import { UsuarioModel } from '../models/userModel';
import { IUser } from '../interfaces/Iuser';
const usu_service = require('../services/usuService');
import {Request,Response} from 'express';
const lodash = require('lodash'); //trabajar con obj y array

const bcryptNode = require('bcrypt-nodejs');
const bcryptJs = require('bcryptjs');

//import jwt from '../services/jwt'; 
const jwt = require('../services/jwt');
const autentic = require('../middlewre/auth');

const pruebas = async (req: any, res: any) => {
  //return res.status(403).send({ msg: 'la peticion no tiene cabecera' })

  await res.send(`status ${res.statusCode} at Usuario!
     \nmessage:Prueba desde Usu Controller
     --Usuario: ${req.body.name}`);
}
const postUsuPrueba = async (req: any, res: any) => {
  try {
    const param = req.body;
    console.log('PARAM', param);
    await res.send(`status ${res.statusCode} at POST! 
    \nmessage:PruebaPost --Usuario: ${req.body.name}
    \nParametro:${param.surname}`);
  } catch (error) {
    console.log('ERRRROS');
    await res.send(`status ${res.statusCode}`)
  }
}

//#region type
/* ******** TYPE **********************/
type Usuario = { name: string, lasName: string, pass: string }
let ussuu: Usuario

type Laura = (value: string) => void
//const speak = (dato: Laura) => { 
const speak = (req: any, res: any) => {
  const params = req.params.dato;
  console.log('iii', params);
  res.status(200).send({ massage: `${params}` })
};

//speak(() => 99);
/**********************************/
//#endregion

//#region saveUser
const saveOne = async (req: any, res: any) => {
//const saveOne = async (req: Request, res: Response) => {
  //rol solo enum: ['admin', 'user']
  const params = req.body;
  if (!params.name || !params.password || !params.surname || !params.cel) {
    console.log('Faltan datos');
    return res.status(400).send({ message: 'Faltan datos' });
  }

  let user2:IUser = {
    name: params.name,
    surname: params.surname,
    nick: params.nick,
    email: params.email,
    //password: esOpcional, se agrega despues
    role: params.role,
    image: params.image || null,
    cel: params.cel
  }
  let user = new UsuarioModel();
  user.name = params.name,
    user.surname = params.surname,
    user.email = params.email,
    //user.password= '', 
    user.nick = params.nick,
    user.role = params.role,
    user.image = params.image,
    user.cel = params.cel

  /* Condicion checkRepetido para no agregar email o nick repetido en BD*/
  // find por prop &or:[]

  ////const rer = await usu_service.findWithName(user.name);
  const rer = await usu_service.findWithName(user2.name);
  console.log('hhhhhh', rer);

  ///const checkRepetido = await usu_service.checkRepetido(user.email.toLowerCase(), user.nick.toLowerCase())
  const checkRepetido = await usu_service.checkRepetido(user2.email, user2.nick)
    .exec((err: any, users: any) => {
      /* console.log('checkRepetido',checkRepetido);
      res.status(200).send({ message: checkRepetido, status:res.statusCode }); */

      /*ACA SERIA EL CHEC SIN SERVICIO
      UsuarioModel.find({ //retorna array usuarios
        $or: [
          { email: user.email.toLowerCase() },
          { nick: user.nick.toLowerCase() }
        ]
      }).exec((err: any, users: any) => {*/

      if (err)
        return res.status(500).send({ massage: 'error a peticion', Status: `${res.statusCode}` });
      if (users && users.length > 0) {
        console.log(`Ya existe el Usuario/${res.statusCode}`);
        return res.status(200).send({ massage: 'Ya existe el Usuario, v', Status: `${res.statusCode}` })

        ////////////////////////////////
        /* if (checkRepetido && checkRepetido>0){
          console.log(`Ya existe el Usuario/${res.statusCode}`);
          return res.status(200).send({ massage: 'Ya existe el Usuario, v', Status: `${res.statusCode}` });
        }if(!checkRepetido){
          return res.status(500).send({ massage: 'error a peticion', Status: `${res.statusCode}` });
        */
      } else {
        //let passwordHaash = await bcryptJs.hash(params.password, null,null,());
        let passwordHash = bcryptJs.hashSync(params.password, 8);
        user2.password = passwordHash;
        user.password = passwordHash; //este es para cuando use el usu sin Iusu

        /////return res.status(200).send({ massage: 'OKA'})
        saveUsuario();
      }
    });
  /* 
    if(ussu){
      return res.status(200).send({ massage: 'Ya existe el Usuario, v', Status: `${res.statusCode}` })
    }
    res.send({ massage: 'Immpeca a guardar', Status: `${res.statusCode}` })

    console.log('ussu');/* 
    res.send({ ussu: ' el Usuario', Status: `${res.statusCode}` }) */
  /*(error) {
console.log('ONE=',error);
  return res.status(500).send({ massage: 'error a peticion', Status: `${res.statusCode}` })
} */

  const saveUsuario = async () => {
    try {
      ///await usu_service.saveOne(user)
      await usu_service.saveOne(user2)
    /*     .exec((err: any, dev: any) => {
          if (err) {
            console.log('err', err);
            return res.status(500).send({ massage: 'error al guardar el Usuario', Status: `${res.statusCode}` })
          }
          if (dev) {
            res.status(200).send({ message: 'Guardado correctamente', usuario: user, Status: `${res.statusCode}` });
            console.log(`User creado OK--${JSON.stringify(user)}`);
          } else {
            res.status(404).send({ message: 'no registro el usuario' });
            console.log("no no worked");
          }
        }); */


        
      /*  
       user.save((err: any,user:any) => {
         if (err) {
           console.log('err', err);
           return res.status(500).send({ massage: 'error al guardar el Usuario', Status: `${res.statusCode}` })
         }
         if (user) {
           res.status(200).send({ message: 'Guardado correctamente', usuario: user, Status: `${res.statusCode}` });
           console.log(`User creado OK--${JSON.stringify(user)}`);
         } else {
           res.status(404).send({ message: 'no registro el usuario' });
           console.log("no no worked");
         }
       }); */
    } catch (error) {
      console.log(`Error User Save- ${error}`);
      /* await res.send(`status ${res.statusCode} at Usuario!
       \nmessage:Prueba desde Usu Controller
       --Usuario: ${req.body.name}`); */
      await res.status(400).send({
        "status": `OK  ${res.statusCode}`,
        "message": `message:Falta completar \nlos datos !!!! ${error}`
      });
    }
    /*}  else {
      console.log(` User mal creado-`);
      await res.status(200).send({ message: `Envia todos los datos.${res.json}****s{ err: 'Invalid request' }` });
      await res.json({ err: 'Invalid request' })
    } */


    //console.log(`PARAMS ${JSON.stringify(params)}- \nUSU- ${params.name}`);
    //encriptarPass( params.name, params.password);
    //generarSalt( req, params.password);

  }
  //}
}
//#endregion

//#region Login

/* Atlas Lucas  email Atlas lucas@gmail.com*/
/* ATLAS Monica "email": "moni@gmail.com","password": "1234s",   */
/* ATLAS Mariana "email": "maa@gmail.com","password": "maa5",   */
const loginUser = async (req: any, res: any) => {
  const params = req.body;
  const email = params.email;
  const password = params.password;

  console.log('params', params);
  console.log('Email', email, '\nPass', password);

  ///es como expresion &&
  //get usu where usu.email:email AND usu.password:pass 
  //Puedo hacer .exec o dentro del find una arrow
  //UsuarioModel.findOne({email:email,password:pass}).exec((err: any, devolucion: any) => {  });

  /*  FUNCIONA DE LAS DOS FORMAS de abajo*/
  //FORMA ! NO anda con await
  /*   UsuarioModel.findOne({ email: email}, (err: any, devolucion: any) => {
      if (err) 
        return res.status(500).send({ 
        message: `Error en la peticion`, status: `${res.statusCode}` 
      });
      if (devolucion) {
        bcryptJs.compare(password, devolucion.password, (err: any, hayDato: any) => {
          if (hayDato) {
            if(req.body.gettoken){
              const token2 = jwt.createtoken(devolucion);
              console.log("Tok:",token2);
              return res.status(200).send(`token2::${token2} Ususa:${devolucion}`);
            }else{
              devolucion.password = undefined; // dejo de mostrar el password
              console.log("login\nUser:",devolucion);
              return res.status(200).send(`login\nUser::${devolucion}`);
            }
          }else{          
            console.log('No se pudo identificar', err);
            return res.status(404).send(`mesg:: No se pudo identificar`);
          }
        })
      }
    }) */

  //FORMA2
  try {
    const usu = await UsuarioModel.findOne({ email: email });
    //la pass la compara elbcrypt entre datos que encontro en el usu guardao y la que entra parametro
    //console.log('El USU', usu);
    //res.send(`login\nmessage::${params}****-${usu}`);

    /* Comaparar  */
    //ANDA DE LAS DOS FOrMAS DE ABAJO

    if (usu) {
      bcryptJs.compare(password, usu.password, (err: any, hayDato: any) => {
        if (hayDato) {
          if (params.gettoken) {
            //si viene parametro en true, genero gettoken , 
            //y devuelvo datos encriptados para usar en peticiones con middelware

            const elToken = jwt.createtoken(usu);

            console.log('Token', params.gettoken, 'es-', elToken);

            console.log('She are ' + autentic.devolver() + ' old', 'UserControl-from autenticated.ts');

            return res.status(200).send({ Toke: elToken, UsuConToken: usu });
          } else {
            usu.password = undefined; // dejo de mostrar el password
            console.log(usu);
            return res.status(200).send({ message: 'EXITO al Loguearse', usu: usu });
          }
        } else {
          console.log('err-', err);
          return res.status(404).send({ message: 'El usuario no se pudo loguear' });
        }
      });
    } else {
      console.log('error en el Mail');
      return res.status(400).send({ message: 'Error en el Mail' });
    }
    /*  try {
       const dato = await bcryptJs.compare(password, usu.password);
       console.log('USU',password,'Usu',usu.password);
       if (dato){
         usu.password = undefined; // dejo de mostrar el password
       console.log(dato);
       return res.status(200).send({ message: 'EXITO al Loguear' });
     }else{return res.status(404).send({ message: 'El usuario no' });}
     } catch (error) {
       console.log('err');
       return res.status(401).send({ message: 'El usuario no se pudo loguear' });
     } */

    //if both match than you can do anything,at start always passwordCheck is false    

    /// passwordCheck?res.send({ message: "Login success",success:passwordCheck }):res.send({ msg:'El usuario no se pudo loguear',success:passwordCheck })

  } catch (error) {
    return res.status(500).send({ message: 'Error en la peticion' });
  }
}
//#endregion

//#region findOne
//pass Atlas $2a$08$HFSDTtufKgFs7HLH5eh1bO6D4hzbb3prHv07CxMvGrwwyk/Qm46aS
//email Atlas man@gmail.com
/*Otro: pass Atlas 1234s -  email Atlas moni@gmwail.com*/
//#endregion
//#region findById
const findById = async (req: any, res: any) => {
  try {
    const id = req.params.codigoId;
    const re = await usu_service.findById(id);
    if (re.num === 500) {
      console.log(re.dato);
      res.status(re.num).send({ masg: re.dato });
    } else {
      console.log(re.dato);
      res.status(re.num).send({ resultado:'ok',masg: re.dato });
    }
  } catch (error: any) {
    console.log('no existe usario con ese _id');
    res.status(404).send({ err: error.message, msg: 'no existe usario con ese _id' });
  }
}
//#endregion
//#region findOnePorEmail etc
//const findOne = async (email: any, pass: any) => {
const findOne = async (req: any, res: any) => {
  console.log('**Param id**', req.params);  // dato url psra Get
  console.log('**Header email**', req.headers.email); // para Get
  console.log('**Body eMail**', req.body.email); //para Put

  let devolu: any;
  /* try { */
  //Parte 0
  console.log('ID', req.params.codigoId);

  /*   await UsuarioModel.findById(req.params.codigoId,(err:any,devol:any)=>{ 
   // await usu_service.findById(req.params.codigoId,(err:any,devol:any)=>{ 
   //UsuarioModel.findOne({ email: req.params.codigoId }, (err: any, devol: any) => {
     if (err) {
       console.log('Error en Peticion');
       return res.status(500).send({ massage: 'Error en Peticion', Status: `${res.statusCode}` })
     } if (!devol) {
       console.log('El ususario no Existe');
       return res.status(404).send({ massage: 'El ususario no Existe', Status: `${res.statusCode}` })
     } else {
       console.log('Es este', devol);
       return res.status(200).send({ massage: 'Es este', devol, Status: `${res.statusCode}` })
     }
   }) */

  /* Parte 1
  const usu = await UsuarioModel.findOne({email2,pass2 });
   if (usu) {
    console.log('El USU=>', usu);
    res.send({ masg: usu })
    devolu = usu;
  }else{
    console.log('error a peticion...');
    return res.status(500).send({ massage: 'error en peticion, vf mail', Status: `${res.statusCode}` });
  } */

  /* Partre 2     
  UsuarioModel.findOne({email2,pass2},(err: any, devolucion: any) => { 
    if(err){console.log('err',err);
          return res.status(500).send({ massage: 'error en peticion, vf mail', Status: `${res.statusCode}` });
  }else{
    console.log('DEV',devolucion);
    res.status(200).send({ masg: devolucion });
  }      
  });*/

  /*Parte 3*/
  /*   UsuarioModel.findOne({ email2, pass2 }).exec((err: any, devolucion: any) => {
      if (err) {
        console.log('err', err);
        return res.status(500).send({ massage: 'error en peticion, vf mail', Status: `${res.statusCode}` });
      } if(!devolucion){
      return res.status(404).send({ massage: 'El ususario no Existe', Status: `${res.statusCode}` })
      }else {
        console.log('DEVolucion', devolucion);
        res.status(200).send({ masg: devolucion });
      }
    }); */

  //PARTE  4
  //const ress = await usu_service.findWithEmail({email2}).exec((err: any, devolucion: any) => {
  //const ress = await usu_service.findWithEmail({email2},(err: any, devolucion: any) => {

  //UsuarioModel.findOne({email:email2},(err: any, devolucion: any) => {
  //const ress = await usu_service.findWithEmail({email2},(err: any, devolucion: any) => {
  const ress = await usu_service.findWithEmail(req.headers.email);
  //const ress = await usu_service.findWithName(email2);
  //const ress = await usu_service.findOne(email2);
  //const ress = await usu_service.findOne(112,44);
  console.log('Reess', ress.length);
  if (ress.length < 0) {
    console.log('RES1', ress);
    res.status(200).send({ masg: ress });
  } else {
    console.log('RES2', ress);
    res.status(201).send({ masg: ress });
  }
  /*  if (err) {
   console.log('err', err);
   return res.status(500).send({ massage: 'error en peticion, vf mail', Status: `${res.statusCode}` });
 } else {
   console.log('DEVolucion', devolucion);
   res.status(200).send({ masg: devolucion });
 }
}); */

  //const usu = await UsuarioModel.find([{ email:'man@gmail.com',password:'password'}]); 
  //es como expresion email && pass
  /* La otra es  */
  //get usu where usu.email:email AND usu.password:pass
  ///Puedo hacer .exec o dentro del find una arrow con el error y la devolucion
  ///UsuarioModel.findOne({email:email,password:pass}).exec((err: any, devolucion: any) => {  });
  ///UsuarioModel.findOne({email:email,password:pass},(err: any, devolucion: any) => { });

  /*  } catch (error) {
     console.log('No hay USU');
     res.send({ masg: 'No hay USU' });
     devolu = null;
   }
   return devolu; */
}
//#endregion
//#region findOtroPorName 
/**todo esto es al cuete, solamente probando la entrada de param url*/
const findOtro = async (req: any, res: any) => {
  const dato = req.params.unName;
  console.log('Dato',dato);
  let cel = 5332 , role='admin';
  let usu: IUser = {
    name: dato,
    surname: dato,
    nick: dato,
    email: dato,
    password: dato,
    role: dato, //'admin
    image: dato,
    cel: dato,
  }
  let user = new UsuarioModel();
    user.name = req.params.unName,
    user.surname = req.params.unName
    user.email = req.params.unName
    //user.password= '', 
    user.nick = req.params.unName
    user.role = 'admin'
    user.image = req.params.unName
    user.cel = 5442

  console.log('Usu=',usu);
  console.log('Uses=',user);
  
  const devolu = await usu_service.findOtro(user);
  if(devolu === null){
    console.log('RES1', 'Nullo otro usuario');
   return res.status(400).send({ masg: 'Nullo otro usuario' });
  }
  if (devolu.length < 0 ) {
    console.log('RES1', 'Nada de otro usuario');
   return  res.status(200).send({ masg: 'Nada de otro usuario' });
  } else {
    console.log('RES2', devolu);
    res.status(201).send({ masg: devolu });
  }
}
//#endregion
//#region findAllUsers paginacion trae array de todos
//recibe por URL un numero para paginacion
const getUsers = async (req: any, res: any):Promise<IUser[] | undefined>=> {
  try {
    let identity_user_id = req.user;
    console.log('idenyidad', identity_user_id);

    const resultado = await usu_service.getUsers();
    if (resultado.length > 0) {

      //------ FOR EACH --------------------------------  
      resultado.forEach((element: any) => {
        console.log(' FOR EACH ===>', element.name + '---' + element._id);
      })
      //------ FOR  --------------------------------  
      for (let i = 0; i < resultado.length; i++) {
        console.log(' FOR ===>', resultado[i].name);
      }
      //------ FOR IN --------------------------------  
      for (let element in resultado) {
        console.log(`FOR IN ===> ${element}`);
      }
      //------ DO WHILE -----------------------------------------------------------
      let k = 0;
      do {
        console.log(`DO WHILE ===> ${resultado[k].name}`);
        k++;
      } while (k < resultado.length);
      //------ WHILE   -----------------------------------------------------------
      let i = 0;
      while (resultado.length > i) {
        console.log(`WHILE ===> ${resultado[i].name}`);
        i++;
      }
      //------ at()  -----------------------------------------------------------
      const cities = ['Mdeo','BsAs','Brasilia','Lima'];
     //------ at() --------------------------------console.log(`AT ==> ${cities.at(0)}`);
      //console.log("cities".at(-1));
      //console.log(cities[cities.length-1]);

       res.status(200).send({ message: resultado });
      return resultado;
    } else {
      console.log('error en la peticion');

      res.status(500).send({ message: 'error en la peticion' });
    return [];
    }
  } catch (error) {
    console.log('Error All', error);
    res.status(400).send({ msg: `no hay ususarios` });
  }
}
//#endregion

//#region delete
const deleteOne = async (req: Request, res: Response) => {
  const body = req.body.identificador;
  const param = req.params.identificador;

  try {
    console.log('-PARAMS:--\n', 'body', body, 'param', param);
    await res.status(200).send({ massage: 'delete\n ', body: `${body}`, param: `${param}`, Status: `${res.statusCode}` });
  } catch (error) {
    console.log('error delete');
    return await res.status(404).send({ massage: 'delete Error', Status: `${res.statusCode}` });
  }
}
//#endregion

//#region patch
const patchOne = (req: any, res: any) => {
  const datoId = req.params.identificador;
  const datoId2 = req.body.datoId;
  console.log('-1---', datoId);
  console.log('--2--', datoId2);

  try {
    console.log('Patch', datoId);
    const resultado = usu_service.findOne(234, 456)
    /* 
       UsuarioModel.findOne({email2,pass2}).exec((err: any, devolucion: any) => { 
      if(err){console.log('err',err);
            return res.status(500).send({ massage: 'error en peticion, vf mail', Status: `${res.statusCode}` });
    }else{
      console.log('DEV',devolucion);
      res.status(200).send({ masg: devolucion });
    }      
    }); */
    return res.status(200).send({ massage: 'Patch', Dato: `${datoId}`, Status: `${res.statusCode}`, res: resultado });
  } catch (error) {
    console.log('error Patch');
    return res.status(404).send({ massage: 'Patch Error', Status: `${res.statusCode}` });
  }
}
//#endregion

//#region -----Encriptar pass -----
const encriptarPass = (myPassword: string, saltRounds: string) => {
  const salt = bcryptNode.genSaltSync(saltRounds);
  const hash = bcryptNode.hashSync(myPassword, salt);
  console.log('HASH', hash);

  //salt es long de la encriptación, por defecto es 10, que lo cambiaremos.
  // Almacene el hash en su base de datos de contraseña.
  bcryptNode.compareSync(myPassword, hash); // false
  const passwordCheck = bcryptNode.compareSync(myPassword, routerUsu.password);
}
//#endregion

//#region genSalt
const generarSalt = (req: any) => {
  /*   bcrypt.genSalt(10, function(err:any, salt:any) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return next(err);
        var newUserDoc = {
          username: req.body.username,
          displayname: req.body.displayname,
          unLower: req.body.username.toLowerCase(),
          email: tokenDoc.email,
          passhash: req.body.password ? hash : impossibleHash
        };
        if (tokenDoc.invitedBy)
          newUserDoc.invitedBy = tokenDoc.invitedBy;
        users.insert(newUserDoc, function (err,inserted) {
          if (err) return next(err);
          if (req.body.authenticate) {
            sessionUser.authenticate(inserted[0],req,res);
          }
          return res.redirect('/');
        }); //users.insert
      }); //bcrypt.hash
    }); //bcrypt.genSalt */
}
//#endregion

module.exports =
{
  getUsers,
  pruebas,
  postUsuPrueba,
  saveOne,
  speak,
  findOne,
  findById,
  findOtro,
  loginUser,
  deleteOne,
  patchOne
}

/* module.exports = 
  [getUsers,
  pruebas,
  postUsuPrueba,
  saveOne,
  speak,
  findOne,
  loginUser] */

