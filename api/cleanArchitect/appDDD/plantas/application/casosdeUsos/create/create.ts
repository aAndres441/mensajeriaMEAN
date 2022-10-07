/**
 * solo conoce a dominio; 
 * dependencia porque es una inyecccion de un repositorio para saber metodos
 * no lo implemento directamente, sino que se injecta en constructor
 */

import { IPlant } from "../../../domain/IPlant.interface";
import { IPlantRepo } from "../../../domain/IPlantRepo.interface";
import { IPropiedad } from "../../../domain/IPropiedad.interface";
import { PlantMapeo } from "../../../domain/PlantMapeo";


export class Create{

    constructor(private readonly repo:IPlantRepo){}

     create = async (plant: PlantMapeo): Promise<IPlant | null> =>
     {
         return await this.repo.create(plant);
     };

 create2 = async (name: string, description: string, propiedades: IPropiedad) => {
     const plant = new PlantMapeo(name, description, propiedades);
     return await this.repo.create(plant);
 }
}
