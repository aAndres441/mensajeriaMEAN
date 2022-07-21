const Message = require('../models/messageModel');

const getMessage = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Message`);
}
const pruebasMessage = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Message! \nmessage:Prueba desde Usu Controller`);        
}
const postMessag = async(req: any, res: any)=>{
     console.log(req.body);
    await res.send(`status ${res.statusCode} at POST! \nmessage:Prueba desde Post`);        
}

module.exports ={getMessage,pruebasMessage}