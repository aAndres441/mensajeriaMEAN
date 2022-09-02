const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const user_rutes = require('./routes/userRoutes');
const message_rutes = require('./routes/messageRoutes');
const follow_rutes = require('./routes/followRoutes');
const publication_rutes = require('./routes/publicationRoutes');
const category_rutes = require('./routes/categoryRoutes');

console.time("Espera de ejecucion Servidor con Express");

 export const app = express(); 

 const init = async () => {

//#region middlewares //middleware metodo qe se ejecuta antes de un controlador
app.use(cors());
app.use(bodyParser.json()); //o app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
//#endregion   
//#region cors
//#endregion   
try {
  //#region settings
  app.set('port', process.env.PORT || 3001); //seteamos una variable que inventamos, port, a express para abrir en el puerto del sist operativo o en 3000
  //app.set('port', 3001); //seteamos una variable que inventamos, port, a express para abrir en el puerto del sist operativo o en 3000
  //#endregion
  //#region rutas

  //rutas gracias al metodo use de express
  app.use('/user', user_rutes);
  app.use('/message', message_rutes);
  app.use('/follow', follow_rutes);
  app.use('/publication', publication_rutes);
  app.use('/category', category_rutes);

  app.get('/', (req: any, res: any) => {
    if (res.statusCode !== 200) {
      throw new Error(`El usuario no existe-`)
    }
    res.status(200).send({
      "status": `OK  ${res.statusCode}`,
      "message": `Well well, Hello My World !!!!`
    });
  })
  app.get('/api/about', (req: any, res: any) => { 
    res.send(`App conectado about ${app.get('port')}`);
  });
  app.get('/home', (req: any, res: any) => {
    res.send(`status ${res.statusCode} at Home`);
  })
  app.get('/veterinarias', (req: any, res: any) => {
    res.send(`status ${res.statusCode} at veterinarias`);
  })
  app.post('/prueba', (req: any, res: any) => {
    //cargo datos en body - form-urlencoded de postman
    console.log(req.body);
    res.send(`status ${res.statusCode} at POST! \nmessage:Prueba desde Post`);
  })
  //#endregion
 
  /***  app.listen() va al final diferentes ***/
  app.listen(
    app.get('port'), () => {
      console.log((`App listening from app.ts running on port http://localhost:${app.get('port')}`));
    }
    //console.log(`App listening from app.ts running on port http://localhost:${app.get('port')}`)
  );

  /* app.listen(
      puerto,()=>{
      console.log ( (`App listening from app.ts running on port http://localhost:${puerto}`));
  }); */

} catch (error) {
  console.log('ERRAR', error);
}

console.timeEnd("Espera de ejecucion Servidor con Express");

}
init();

//module.exports  = init();
//export default init
// no anda asi, export const init;
module.exports = app;