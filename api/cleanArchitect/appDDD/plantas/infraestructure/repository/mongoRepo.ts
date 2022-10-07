/**
 * implementa la interface de dominio que pega en BD mongo
 */

import { IPlant } from "../../domain/IPlant.interface";
import { IPlantRepo } from "../../domain/IPlantRepo.interface";
import PlantModel from "../modelo/model";


export class MongoRepo implements IPlantRepo {
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
    
    listTask = async ():Promise<IPlant[]> => {
        const resultado = await PlantModel.find();
        return resultado;
    }

    createTask = async (plant: IPlant):Promise<IPlant> => { 
        const resultado = await PlantModel.create(plant);
        return resultado;
    }

    findTaskById=async(uuid: string):Promise<IPlant> => { 
        const resultado = await PlantModel.findById(uuid);
        return resultado;
    }

    findOneTask = async(dato: string):Promise<IPlant> => { 
        const resultado = await PlantModel.findOne(dato);
        return resultado;
    }

     deleteTask = async (dato:string):Promise<IPlant> => { 
        const resultado = await PlantModel.deleteTask(dato);
        return resultado;
    }
    
}