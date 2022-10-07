import { TaskUserCase } from "../application/taskUseCase";
import {Response, Request } from "express";
//import { TaskMapeo } from "../../domain/task.mapeo";

/**
 * Este controlador no va a matchear con ningun Servicio, sera con capa Aplicacion Caso de Uso
 * por eso el async va en caso de uso no aca, ni tiene servicio.
 * si pondremos req , res de express
 */
export class TaskControlador{
    constructor(private casoUso:TaskUserCase){
    }
    
     getCtrl =  async (req:Request,res:Response): Promise<string> =>{
    /* public async getCtrl(req:Request,res:Response): Promise<string> { */
      const dato = req.body.email; 
        const resu = await this.casoUso.encontrarTask(dato);
        if(resu===null){
            console.log('NULO');
            
        }else{
        console.log('desdecontrolador');}
        
        return `controlador a -${resu}`;
    }
    
    public  insertCtrl = async(req:Request,res:Response)=> { 

        const namee = req.body.name;
        const params = req.body.params;
        const header = req.headers.email;
        
        console.log(namee);
        console.log(params);        
        console.log(header);
        /* 
         req.params);  // dato url psra Get
        req.headers.email); // para Get
        req.body.email); //para Put */
        
        console.log(`Body- ${JSON.stringify(req.body)}`); 
        
               
        try {            
        const creado = await this.casoUso.crearTask2(req.body.name,req.body.añoInicio,req.body.descripcion);
          console.log('OK', creado);
            res.status(200).send({ msg: `Registro is OK- ${JSON.stringify(creado)}`, dato:`Name- ${req.body.name}`});
        } catch (error) {
            console.log('Error All', error);
            res.status(400).send({ msg: `no se pudo registrar` });
        }
    }

    listarTask = async (req:Request,res:Response)=>{  
        
        const namee = req.body;
        const parametro = req.params.numero;
        const header = req.headers.email;
        
        console.log(namee.name);
        console.log(parametro);        
        console.log(header);

            const resu = await this.casoUso.listarTask;
            try {
                console.log('OK', resu.length);
                res.status(200).send({ msg: `OK- ${resu}`});
                setTimeout(() => {
                    console.log('setTimeout');  
                  },2000);
            } catch (error) {
                console.log('Error All', error);
                res.status(400).send({ msg: `nooo hay` });
            }
        }
    
    

}