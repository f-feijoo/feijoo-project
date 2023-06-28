import { carritosDao } from "../database/daos/index.js";

export class CarritoService {
  constructor() {
    this.carrito = carritosDao;
  }
  async mostrarCarrito(id) {
    return await this.carrito.mostrar(id);
  }

  async agregarProducto(carrito, producto) {
    carrito.productos.push(producto);
    return await this.carrito.actualizar(carrito);
  }

  async actualizarCarrito(carrito) {
    return await this.carrito.actualizar({
      ...carrito
    });
  }

  async crearCarrito(obj) {
    return await this.carrito.guardar(obj);
  }

  async eliminarCarrito(id) {
    return await this.carrito.borrar(id);
  }

  async eliminarProducto(carrito, index) {
    carrito.productos.splice(index, 1);
    return await this.carrito.actualizar(carrito);
  }
}
