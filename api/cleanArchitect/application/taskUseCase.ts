
/**
 * solo conoce a dominio; dependencia porque es una inyecccion de un repositorio para saber metodos
 * no lo implemento directamente, sino que se injecta en constructor
 */
import { TaskMapeo } from '../domain/task.mapeo';
import { ITaskRepo } from '../domain/task.repository';

export class TaskUserCase {

   constructor(private readonly repo: ITaskRepo) { }

   public probarUso = () => {
      return 'probarUso';
   }

   crearTask = async (task: TaskMapeo) => {
      return await this.repo.createTask(task);
   };

   crearTask2= async (name: string, añoIni: number, desc: string) => {
      const task = new TaskMapeo(name, añoIni, desc);
      const cfreado = await this.repo.createTask(task);
      return cfreado;
   }
  // listarTask = async (tasks: TaskMapeo[]) => {
   listarTask = async ():Promise<TaskMapeo[]> => {
      /**
       * creamos un par de task para mostrar en este ej
       */

      const task1 = new TaskMapeo('Julito', 2001, 'Genio el tipo');
      const task2 = new TaskMapeo('Mariana', 1990);
      const listA = [task1, task2];
      try {
       /*   const list = await this.repo.listTask();
         if (!list) {
            console.log('No hay nada en  la lista Task');
            return []
         } else{
            list.forEach((task) => {
               console.log(`Listado--/n${task}`);

            });
            return listA} */
            return listA;
      } catch (error) {
         console.log('Algo malio sal');
         return []
      }
   };

   encontrarTask = async (uuid: string) => {
      try {
         const res = await this.repo.findOneTask(uuid)
         if (res) return res;
      } catch (error) {
         return console.log('Encontar malio sal');
      }
   };

}