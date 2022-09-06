//const UsuarioModel = require('../models/userModel');
import { UsuarioModel } from '../models/userModel';
import { IUser } from '../interfaces/Iuser';
const {v4:uuid} = require('uuid'); //es como as uuid

//const findOne = model.findOne({email:'',pass:''}).exec((err: any, devolucion: any) => { 
const findOne = (dato1: number, dato2: number) => {
    if (dato1 > dato2) {
        //return res.status(500).send({ massage: 'error en peticion, vf mail', Status: `${res.statusCode}` });
        ////return err;
        console.log('gana Dato1`');
        return 'Gana Dato1';
    } else {
        console.log('gana Dato2`');
        //return devolucion ;
        return `gana Dato2`;
    }
};
const findOtro = async (usu: IUser) => {
    const resultado = await UsuarioModel.findOne({name:usu.name}).exec();
    console.log('ooooo');
    return resultado;
}
const findWithName = async (dato: string) =>{
   //const res =  UsuarioModel.findIndex((dato:any)=>dato.name===name);
   console.log('Find NAME' , dato);
   
   const res= await UsuarioModel.findOne({ name: dato }).exec();
    console.log('ooNameooo',res);
    return res;    
}
const findWithEmail =  async (dato: string) =>{
   //const res =  UsuarioModel.findIndex((dato:any)=>dato.name===name);
   const res= await UsuarioModel.findOne({ email: dato }); 
return res;       
}

const findById =  async (dato: string) =>{
   //const res =  UsuarioModel.findIndex((dato:any)=>dato.name===name);
  
   const dev = await UsuarioModel.findById(dato).exec();
    if (dev){return {num:200,dato:dev}; }
    return {num:500,dato:'error en peticion'};
}

//const checkRepetido =  (email:any,nick:any)=>{
    const checkRepetido =  (datoMail:string,datoNick:string)=>{
         let emai=datoMail.toLowerCase();
         let avatar=datoMail.toLowerCase();
        const res =  UsuarioModel.find({
            $or:[
                {email:emai},//le hago aca el casteado, antes eera en controller
                {nick:avatar} //le hago aca el casteado
            ]
        });   
        return res
    }

const getUsers = async () => {
    try {
        let res = await UsuarioModel.find();
         return res;
    } catch (e) {
        console.log(e);
    }
}

////const saveOne = async (dato: any) => { // dato;IUser
const saveOne = async (dato: IUser) => { // dato;IUser
    //const res = UsuarioModel.create(dato);
    //const res = UsuarioModel.save(dato).exec((err: any, devolucion: any )=>{})
    /* const resuelve =  *///UsuarioModel.create({ dato }, (err: any, devolucion: any) => {
      /*   if (err){ 
        console.log('LLLLLLLLL', err);
        return err; }           
        else {
            console.log('****', devolucion);
            return devolucion
        } */
    //});/* 
    console.log('uuid',uuid());
    const res = await UsuarioModel.create(dato)
    .exec((err: any, dev: any) => {
        if (err) {
          console.log('err', err);
          return res.status(500).send({ massage: 'error al guardar el Usuario', Status: `${res.statusCode}` })
        }
        if (dev) {
          res.status(200).send({ message: 'Guardado correctamente', usuario: res, Status: `${res.statusCode}` });
          console.log(`User creado OK--${JSON.stringify(dev)}`);
        } else {
          res.status(404).send({ message: 'no registro el usuario' });
          console.log("no no worked");
        }
      });
    return res;
}

module.exports = {
  getUsers,
  saveOne,
  findOne,
  checkRepetido,
  //loginUser,
  //deleteOne,
  //patchOne,
  findWithName,
  findWithEmail,
  findById,
  findOtro
}