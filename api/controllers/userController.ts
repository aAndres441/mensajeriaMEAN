'use strict';
//const User = require('../models/userModel');
//import {UsuarioModel} from '../models/userModel';
import {UsuarioModel} from '../models/userModel';
const bcryptNode = require('bcrypt-nodejs');
const bcryptJs= require('bcryptjs');

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
  try { //rol solo enum: ['admin', 'user']
    const params = req.body;
    let user = new UsuarioModel();
    if (params.name && params.surname
      && params.email && params.password
      && params.role) {
      user.name = params.name,
      user.surname = params.surname,
      user.email = params.email,
      /*user.password= '', */
      user.nick = params.nick,
      user.role = params.role,
      user.image = params.image,
      user.cel = params.cel

      //let passwordHaash = await bcryptJs.hash(params.password, null,null,());
      let passwordHash = bcryptJs.hashSync(params.password, 8);
        user.password = passwordHash;
// Createres.send({message:passwordHash});
//res.send({Uusario:user});
console.log({user});

        user.save((err: any) => {
          if (err) {
            console.log('err',err);
            return res.status(500).send({ massage: 'error al guardar el Usuario' })
          }
          if (user) {
            res.status(200).send({message:'Guardado correctamente' ,usuario: user });
            console.log(`User creado OK--${JSON.stringify(user)}`);
          } else {
            res.status(404).send({ message: 'no registro el usuario' });
            console.log("no no worked");
          }
        });
    } else {
      console.log(` User mal creado`);
      await res.status(200).send({ message: `Envia todos los datos` });
      await res.json({ err: 'Invalid request' })
    }

    /*          console.log(`User creado OK--${JSON.stringify(user)}`); 
    await res.send(`status ${res.statusCode} at POST! 
    \nmessage:OK Post One USU- ${user.name}-${user.password}`);

   await bcryptNode.hash(params.password,null,null,(err:any,hash:any)=>{
    //await bcrypt.hash(this.password, 10); next(); });
    user.password=hash;
    console.log('pasUsu',hash);
    User.save((err:any,guardado:any)=>{
      if (err) { return res.status(500).send({message:'Error al guardar Usu'}); }
      if(guardado){res.status(200).send({user:guardado})}
    })         
    });          
 
 
console.log(`User creado OK--${JSON.stringify(user)}`); 
await res.send(`status ${res.statusCode} at POST! 
\nmessage:OK Post One USU- ${user.name}`);   */

    //console.log(`PARAMS ${JSON.stringify(params)}- \nUSU- ${params.name}`);
    //encriptarPass( params.name, params.password);
    //generarSalt( req, params.password);

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
}
//#endregion

//#region findById
const findByIdUsu = async(req: any, res: any)=>{
  const dato = req.headers.codigoId;
  try {
  //const usu = await UsuarioModel.findById('62cc6e8efe33c6d855e60d99');  
  const usu = await UsuarioModel.findById(dato);
  await res.status(200).send({
    "status": `OK  ${res.statusCode}`,
    "message": `Well well, Hello My USUARIO !!!!${usu}`
  });
  console.log('Por ID:',usu.name); 
  /* 
          if (res.statusCode !== 200) { throw new Error(`El usuario no existe-`) }
        res.status(200).send({
          "status": `OK  ${res.statusCode}`,
          "message": `Well well, Hello My World !!!!`)}
 */   
  } catch (error) {
    console.log('No exist this ID usuario'); 
    console.log('No exist this ID usuario',dato); 
    res.statusCode,'El usuario no existe';   
  }  
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
   res.send({message:resultado});   
   resultado.forEach((element:any) => {     
   console.log(' NAME===>',element.name +'---'+ element._id);  
   })   
  } catch (error) {
   console.log('Error All', error);  
   res.send(`status ${res.statusCode} off`);
  }
 }
 //#endregion

//#region -----Encriptar pass -----
const encriptarPass = (myPassword:string,saltRounds:string)=>{
const salt = bcryptNode.genSaltSync(saltRounds);
const hash = bcryptNode.hashSync(myPassword, salt); 
console.log('HASH',hash);

//salt es long de la encriptación, por defecto es 10, que lo cambiaremos.
// Almacene el hash en su base de datos de contraseña.
bcryptNode.compareSync(myPassword, hash); // false
const passwordCheck = bcryptNode.compareSync(myPassword, user.password);

}
//#endregion

//#region genSalt
const generarSalt=(req:any)=>{
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
  findByIdUsu
}