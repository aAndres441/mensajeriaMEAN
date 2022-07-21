const Category = require('../models/categoryModel');

const getCategories = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Category`);
}
const pruebasCategory = async(req: any, res: any)=>{
    await res.send(`status ${res.statusCode} at Category! \nmessage:Prueba desde Category Controller`);        
}
const postCategory = async(req: any, res: any)=>{
     console.log(req.body);
    await res.send(`status ${res.statusCode} at Category! \nmessage:Prueba desde Category`);        
}  

  module.exports = {
    getCategories,
    pruebasCategory
  }