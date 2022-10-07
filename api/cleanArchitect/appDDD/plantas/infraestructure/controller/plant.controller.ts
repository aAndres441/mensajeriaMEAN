/*
 * viene desde las rutas y sera para usar datos del Mock
* no matchea con ningun servicio, estsera con capa Aplicacion Caso de Uso
* sin conocer a Dominio tiene modelo que envia info a caso Uso no a Servicio
* como no tiene servicio, solo conoce a aplicacion caso de uso, donde crea modelo de BD (ej mongoose)
* por eso el async va en caso de uso no aca,
* aca realiza consultas 
* el async await va en caso de uso, aca lo hice asi
* ademas no hice clase con injeccion de dependenncia, si exporto modulo con metodos.
* si ponemos req res de express
 */

/* import { UserCaseCreate } from "../application/taskUseCase/"; */
import {Response, Request } from "express";
import { Create } from "../../application/casosdeUsos/create/create";
import { Searching } from "../../application/casosdeUsos/search/searchings";
//import { TaskMapeo } from "../../domain/task.mapeo";

/**
 * Este controlador no va a matchear con ningun Servicio, sera con capa Aplicacion Caso de Uso
 * por eso el async va en caso de uso no aca, ni tiene servicio.
 * si pondremos req , res de express
 */
export class PlantControlador{
    constructor(private CaseCreate:Create,private CaseFind:Searching){
    }
    
     getCtrl =  async (req:Request,res:Response): Promise<string> =>{
    /* public async getCtrl(req:Request,res:Response): Promise<string> { */
      const dato = req.body.email; 
        const resu = await this.CaseCreate.create(dato);
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
        const creado2 = await this.CaseCreate.create2(req.body.name,req.body.description,req.body.propiedades);
        const creado = await this.CaseCreate.create(req.body.name);
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

            const resu = await this.CaseFind.list;
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