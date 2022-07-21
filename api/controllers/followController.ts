const Follow = require('../models/followModel');

const getFollows = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Follow- s OK`);
}
const pruebasFollow = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Follow! \nmessage:Prueba desde Follow Controller`);        
}
const postFollow = async(req: any, res: any)=>{
     console.log(req.body);
    await res.send(`status ${res.statusCode} at Follow! \nmessage:Prueba desde Follow-Body:\n${JSON.stringify(req.body)}`);        
  }  
  const saveFollow = async(req:any,res:any)=>{
    try {
      /*  */
    } catch (error) {
      console.log(`Error Folloe Save- ${error}`);
      
    }
  }

  module.exports = {
    getFollows,
    pruebasFollow,
    postFollow
  }