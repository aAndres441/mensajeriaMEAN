const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const init = async () => {

    console.time("Espera de ejecucion");

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    //settings   
    try {        
    app.set('port', process.env.PORT || 2022); //seteamos una variable que inventamos, port, a express para abrir en el puerto del sist operativo o en 3000
    app.get('/', (req: any, res: any) => {
        if (res.statusCode !== 200) {
          throw new Error(`El usuario no existe-`)
        }
        res.status(200).send({
          "status": `OK  ${res.statusCode}`,
          "message": `Well well, Hello My World !!!!`
        });
      })
    app.get('/api/about', (req: any, res: any) => { res.send(`App conectado a ${app.get('port')}`) });
    app.get('/home', (req: any, res: any) => {
        res.send(`status ${res.statusCode} at Home`);
      })
    //#region /***  app.listen() va al final diferentes ***/
      app.listen(
          app.get('port'),()=>{ 
            console.log ( (`App listening from app.ts running on port http://localhost:${app.get('port')}`));}
          //console.log(`App listening from app.ts running on port http://localhost:${app.get('port')}`)
       ); 

    /* app.listen(
        puerto,()=>{
        console.log ( (`App listening from app.ts running on port http://localhost:${puerto}`));
    }); */
    
} catch (error) {
    console.log('ERRAR',error);
}

    //#endregion

    console.timeEnd("Espera de ejecucion");

}
init();