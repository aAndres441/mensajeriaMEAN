/*
* implementa la interface de dominio que pega en BD SQL 
 */
/* 
import { IPlant } from "../../domain/task.IEntity";
import { IPlantRepo } from "../../domain/task.repository";
import PlantModel from "../modelo/taskModelSchema"; */

import { IPlant } from "../../domain/IPlant.interface";
import { IPlantRepo } from "../../domain/IPlantRepo.interface";
import PlantModel from "../modelo/model";

export class MySQLRepo implements IPlantRepo{
    create(task: IPlant): Promise<IPlant | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<IPlant[] | null> {
        throw new Error("Method not implemented.");
    }
    findOne(dato: string): Promise<IPlant | null> {
        throw new Error("Method not implemented.");
    }
    findById(uuid: string): Promise<IPlant | null> {
        throw new Error("Method not implemented.");
    }
    delete(dato: string): Promise<IPlant | null> {
        throw new Error("Method not implemented.");
    }
    createTask = async (task: IPlant) => {
        const resultado = await PlantModel.create(task);
        return resultado;
    }

    findTaskById=async(uuid: string)=> {
        const resultado = await PlantModel.findById(uuid);
        return resultado;
    }

    findOneTask = async(dato: string)=> {
        const resultado = await PlantModel.findOne(dato);
        return resultado;
    }

     deleteTask = async (dato:string)=> {
        const resultado = await PlantModel.deleteTask(dato);
        return resultado;
    }
    
    listTask = async ()=> {
        const resultado = await PlantModel.find();
        return resultado;
    }

}