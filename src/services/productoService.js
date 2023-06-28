import { productosDao } from "../database/daos/index.js";

export class ProductoService {
  constructor() {
    this.producto = productosDao;
  }
  async mostrarProducto(id) {
    return await this.producto.mostrar(id);
  }

  async agregarProducto(productoNuevo) {
    return await this.producto.guardar(productoNuevo);
  }

  async mostrarTodosProductos() {
    return await this.producto.mostrarTodos();
  }

  async actualizarProducto(prod) {
    return await this.producto.actualizar(prod);
  }

  async eliminarProducto(id) {
    return await this.producto.borrar(id);
  }
}
