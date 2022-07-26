'use strict';
//const UsuarioModel = require('../models/userModel');
import { UsuarioModel } from '../models/userModel';
const bcryptNode = require('bcrypt-nodejs');
const bcryptJs = require('bcryptjs');

const pruebas = async (req: any, res: any) => {
  await res.send(`status ${res.statusCode} at Usuario!
     \nmessage:Prueba desde Usu Controller
     --Usuario: ${req.body.name}`);
}
const postUsuPrueba = async (req: any, res: any) => {
  try {
    const param = req.body;
    console.log('LOG', req.body);
    console.log('PARAM', param);
    await res.send(`status ${res.statusCode} at POST! 
    \nmessage:PruebaPost --Usuario: ${req.body.name}
    \nParametro:${param.surname}`);
  } catch (error) {
    console.log('ERRRROS');
    await res.send(`status ${res.statusCode}`)
  }
}

/* ******** TYPE **********************/
type Usuario = { name: string, lasName: string, pass: string }
let ussuu: Usuario

type Laura = (value: string) => void
const speak = (dato: Laura) => { };
speak(() => 99);
/**********************************/
//#region saveUser
const saveOne = async (req: any, res: any) => {
  //rol solo enum: ['admin', 'user']
  const params = req.body;
  let user = new UsuarioModel();
  /* if (params.name && params.surname
    && params.email && params.password
    && params.role) {
    user.name = params.name,
      user.surname = params.surname,
      user.email = params.email,
      //user.password= '', 
      user.nick = params.nick,
      user.role = params.role,
      user.image = params.image,
      user.cel = params.cel */

  user.name = params.name,
    user.surname = params.surname,
    user.email = params.email,
    //user.password= '', 
    user.nick = params.nick,
    user.role = params.role,
    user.image = params.image,
    user.cel = params.cel
  /* console.log({ user }); */

  /* Condicion para no agregar email o nick repetido en BD*/
  //#region find por prop &or:[]
  UsuarioModel.find({
    $or: [
      { email: user.email.toLowerCase() },
      { nick: user.nick.toLowerCase() }
    ]
  }).exec((err: any, users: any) => {
    if (err) return res.status(500).send({ massage: 'error a peticion', Status: `${res.statusCode}` });
    if (users && users.length > 0) {
      console.log(`Ya existe el Usuario/${res.statusCode}`);      
      return res.status(200).send({ massage: 'Ya existe el Usuario, v', Status: `${res.statusCode}` })
    } else {
      //let passwordHaash = await bcryptJs.hash(params.password, null,null,());
      let passwordHash = bcryptJs.hashSync(params.password, 8);
      user.password = passwordHash;
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

  //#endregion
  const saveUsuario = async () => {
    try {
      user.save((err: any) => {
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
      });
    } catch (error) {
      console.log(`Error User Save- ${error}`);
      /* await res.send(`status ${res.statusCode} at Usuario!
       \nmessage:Prueba desde Usu Controller
       --Usuario: ${req.body.name}`); */
      await res.status(200).send({
        "status": `OK  ${res.statusCode}`,
        "message": `message:Falta completar \nlos datos !!!!`
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
}
//#endregion

//region Login
//password Atlas $2a$08$HFSDTtufKgFs7HLH5eh1bO6D4hzbb3prHv07CxMvGrwwyk/Qm46aS
//email Atlas man@gmail.com

const loginUser = async (req: any, res: any) => {
  const params = req.body;  
  const email = params.email;
  const password = params.password;
  //let password = '$2a$08$HFSDTtufKgFs7HLH5eh1bO6D4hzbb3prHv07CxMvGrwwyk/Qm46aS';
  //let password2 = '$112a$08$HFSDTtufKgFs7HLH5eh1bO6D4hzbb3prHv07CxMvGrwwyk/Qm46aS';
 
  console.log('Email',email,'Pass',password);

  ///es como expresion &&
  //get usu where usu.email:email AND usu.password:pass 
  //Puedo hacer .exec o dentro del find una arrow
  //UsuarioModel.findOne({email:email,password:pass}).exec((err: any, devolucion: any) => {  });

  /*  FUNCIONA DE LAS DOS FORMAS de abajo*/

  /*  const usu = await UsuarioModel.findOne({ email:'man@gmail.com', password:'$2a$08$HFSDTtufKgFs7HLH5eh1bO6D4hzbb3prHv07CxMvGrwwyk/Qm46aS' },
   //const usu = await UsuarioModel.findOne({ email: email, password: password },
      (err: any, devolucion: any) => {
     if (err) return res.status(500).send({ message: `Error` , status:`${res.statusCode}` });
     if (devolucion) {
       console.log('El USU',devolucion); 
       res.status(200).send(`login\nmessage::${devolucion}`);
     }
   }) */

  try {
    const usu = await UsuarioModel.findOne({ email: email });
    //console.log('El USU', usu);
    //res.send(`login\nmessage::${params}****-${usu}`);

    /* Comaparar  */
    //ANDA DE LAS DOS FOrMAS DE ABAJO

    if(usu){bcryptJs.compare(password, usu.password,(err:any,dato:any)=>{
     if (dato){console.log(usu);return res.status(200).send({ message: 'EXITO',usu:usu});}
     else{console.log('err');return res.status(404).send({ message: 'El usuario no se pudo loguear' });}            
   });}

    /* 
      try {
        await bcryptJs.compare(password, usu.password);
        console.log('USU',password,'Usu',usu.password);
        console.log(usu);
        return res.status(200).send({ message: 'EXITO al Loguear', usu: usu });
      } catch (error) {
        console.log('err');
        return res.status(404).send({ message: 'El usuario no se pudo loguear' });
      }
       */
    //if both match than you can do anything,at start always passwordCheck is false    
    /// passwordCheck?res.send({ message: "Login success",success:passwordCheck }):res.send({ msg:'El usuario no se pudo loguear',success:passwordCheck })

  } catch (error) {
    return res.status(404).json({ msg: "Error en la peticion" })
    //res.send({ message: `Error` , status:`${res.statusCode}`});
  }
}
//#endregion

//#region findOne
//pass Atlas $2a$08$HFSDTtufKgFs7HLH5eh1bO6D4hzbb3prHv07CxMvGrwwyk/Qm46aS
//email Atlas man@gmail.com
const findOne = async (email: any, pass: any) => {
  //const dato = req.headers.codigoId;
  let devolu:any; 
  try {
    //const usu = await UsuarioModel.findById('62cc6e8efe33c6d855e60d99');  
    const usu = await UsuarioModel.find([{email:email,password:pass}]); //es como expresion &&
    //const usuJson = await usu.json();
    /* if(usuJson.status !==200){
        throw new Error(`Error nombre  ${usuJson.status}`);
 } */
 //return `Name: ${usuJson[0].name.official`};
     if (usu) { 
      //console.log('El USU'); 
      devolu=usu;  }

      /* La otra es  */
      //get usu where usu.email:email AND usu.password:pass
      ///Puedo hacer .exec o dentro del find una arrow con el error y la devolucion
      ///UsuarioModel.findOne({email:email,password:pass}).exec((err: any, devolucion: any) => {  });
      ///UsuarioModel.findOne({email:email,password:pass},(err: any, devolucion: any) => { });
                           
  } catch (error) {
   // console.log('No hay USU');
    devolu= null;
  }
      
  return devolu;
}
//#endregion
//#endregion
//#region findAll trae array de todos
/* const pruebas = async (req: any, res: any) => {
  await res.send(`status ${res.statusCode} at Usuario!
     \nmessage:Prueba desde Usu Controller
     --Usuario: ${req.body.name}`);
} */
const getUsers = async (req: any, res: any) => {
  try {
    const resultado = await UsuarioModel.find();
    res.send({ message: resultado });
    resultado.forEach((element: any) => {
      console.log(' NAME===>', element.name + '---' + element._id);
    })
  } catch (error) {
    console.log('Error All', error);
    res.send(`status ${res.statusCode} off`);
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
  const passwordCheck = bcryptNode.compareSync(myPassword, user.password);

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

module.exports = {
  getUsers,
  pruebas,
  postUsuPrueba,
  saveOne,
  speak,
  findOne,
  loginUser
}