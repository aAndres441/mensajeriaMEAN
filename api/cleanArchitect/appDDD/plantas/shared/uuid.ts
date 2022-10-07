/**
 * clase que genera uuid
 */
 const { v4: uuid } = require('uuid');

 export class Uuid {
     /* constructor(value: string) {
         this.ensureIsValidUuid(value);
     } */
     
     constrctor(){this.generaUuid}
 
    /*  static random(): Uuid {
         return new Uuid(uuid());
     } */
 
      generaUuid = ():string =>{
         return uuid();
      }
     private ensureIsValidUuid(id: string): void {
         if (!this.isValidate(id)) {
             throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`);
         }
     }
 
     private isValidate = (valor: string): boolean => {
         if (valor === null || valor === undefined) {
             return false;
         } else {
             return true;
         }
     }
 
     private isInavalid = (): string => {
         return 'Value must be defined';
     }
 }