import { Uuid } from "../shared/uuid";
import { IPlant } from "./IPlant.interface";
import { IPropiedad } from "./IPropiedad.interface";
import { Preparacion } from "./preperacionEnum";


/**
* esta clase nos genera un objeto con esos datos requeridos en BD
*/
export class PlantMapeo implements IPlant {
    uuid: string;
    name: string;
    description: string;
    propiedades: IPropiedad;


    constructor(name: string, description: string, propiedades?: IPropiedad) {
        this.uuid = new Uuid().generaUuid();
        this.name = name;
        this.description = description;
        this.propiedades = this.unaProp()
    }

    unaProp = (): IPropiedad => {
        const prop: IPropiedad = {
            recomendacion: ['noche', 'dia'],
            dosis: 121,
            preparado: this.unaPreparacion(),
        }
        return prop;
    }

    unaPreparacion():Preparacion {
        return Preparacion.aceite;
    }

    toString(): string {
        return `Recomendado: ${this.propiedades.recomendacion[1]}`;
    }

}