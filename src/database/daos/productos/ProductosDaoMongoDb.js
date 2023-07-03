import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      nombre: { type: String, required: true },
      desc: { type: String, required: true },
      img: { type: String, required: true },
      precio: { type: Number, required: true },
      categoria: { type: String, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductosDaoMongoDb;
