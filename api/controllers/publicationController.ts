const Pub = require('../models/publicationModel');

const getPublications = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Public`);
}
const pruebasP = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Public! \nmessage:Prueba desde Public Controller`);        
}
const postPub= async(req: any, res: any)=>{
     console.log(req.body);
    await res.send(`status ${res.statusCode} at POST! \nmessage:Prueba desde Publication`);        
}  

  module.exports = {
    getPublications,
    pruebasP
  }