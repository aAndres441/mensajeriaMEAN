// Using Node.js `require()`
const mongoose = require('mongoose');
// Using ES6 imports en tsconfig.json
//import mongoose from 'mongoose';
const Schema = mongoose.Schema;

class Database {
   async init() {

    //const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const blogPost = new Schema({
      author: ObjectId,
      title: {
		type: String,
		required: true
	  },
      body: String,
      date: Date
    });

    const MyModel = mongoose.model(blogPost);
    const instance1 = new MyModel();
    instance.my.key = 'hello';
    instance.save(function (err) {
      //
    });
    blogPost.find({}, function (err, docs) {
      // docs.forEach
    });
    const instance2 = await MyModel.findOne({});
    console.log(instance.my.key);  // 'hello'

    /* 
    ¡Importante! Si abrió una conexión separada utilizando ´
    mongoose.createConnection()pero intenta acceder al modelo
     a través de mongoose.model('ModelName')él, no funcionará
      como se esperaba, ya que no está conectado a una conexión
       de base de datos activa. En este caso accede a tu modelo
        a través de la conexión que creaste:
     */
    const conn = mongoose.createConnection('your connection string');
    const modelo = conn.model('ModelName', Schema);
    const m = new MyModel;
    m.save(); // works
   
    //el de abajo no funciona porque el objeto de conexión predeterminado nunca se conectó
    /* const conn2 = mongoose.createConnection('your connection string');
    const MyModel2 = mongoose.model('ModelName', schema);
    const m2 = new MyModel;
    m.save();
 */
    
    module.exports =db;  //esta ser la requerida con .db desde index o donde sea que este el express(), etc 
    

  }
}

//export default Database;
//module.exports = Blog = mongoose.model('blog', blogPost);
