import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const task_route = require('./infraestructure/rutas/task.Routes');

/*
*Si lo requiero debo iniciarlo  en su modulo, dbInit();
sino solo o exporto e importa aca, luego lo llamo
*/
//const mongo = require ('./infraestructure/db/mongo');
import dbInit from './infraestructure/db/mongo';


console.time("Demora en crear Servidor con Express de CleanArchitecture");

const app = express();

const init = () => {

    console.log('INICIO\n antes llama a db mongo');

    app.use(cors());
    app.use(bodyParser.json());

    try {
        
        app.set('port', process.env.PORT || 3001); //seteamos una variable que inventamos, port, a express para abrir en el puerto del sist operativo o en 3000
        
        app.use('/task', task_route);
       
       /*  dbInit().then(()=>{
            console.log('llamada de inicio a ocneccionMongo');
            
        }); */
        app.get('/', (req: any, res: any) => {
            if (res.statusCode !== 200) {
              throw new Error(` no existe nada-`)
            }
            res.status(200).send({
              "status": `OK  ${res.statusCode}`,
              "message": `Well well, Hello Moon!!!!`
            });
          })

        const conectaMongo = async ()=>{
            const ss = await dbInit();
            console.log('llamada desde inicio a conectaMongo');
        };
        conectaMongo();

        app.listen(app.get('port'), () => {
            console.log((`TASK running on port http://localhost:${app.get('port')}`));
          } );
    } catch (error) {
        console.log('ERRAR', error);
    }

    console.timeEnd("Demora en crear Servidor con Express de CleanArchitecture");
}
init();

