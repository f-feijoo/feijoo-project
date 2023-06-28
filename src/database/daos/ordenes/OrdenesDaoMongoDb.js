import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class OrdenesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("ordenes", {
      productos: { type: [], required: true },
      numero: { type: Number, required: true },
      timestamp: { type: String, required: true },
      usuario: { type: String, required: true },
      estado: { type: String, required: true },
    });
  }
}

let Ordenes = new OrdenesDaoMongoDb();

export default Ordenes;
