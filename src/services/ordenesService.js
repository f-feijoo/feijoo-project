import OrdenesDaoMongoDb from "../database/daos/ordenes/OrdenesDaoMongoDb.js";

export class OrdenesService {
  constructor() {
    this.ordenes = OrdenesDaoMongoDb;
  }
  async mostrarOrden() {
    return await this.ordenes.mostrarTodos();
  }

  async crearOrden(obj) {
    return await this.ordenes.guardar(obj);
  }
}
