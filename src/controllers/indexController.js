import { CarritoService } from "../services/carritoService.js";
import { ProductoService } from "../services/productoService.js";
import { UsuarioService } from "../services/usuarioService.js";

const carritoService = new CarritoService();
const productoService = new ProductoService();
const usuarioService = new UsuarioService();

export const index = async (req, res) => {
  let reqUsuario; // Chequeo si hay un usuario logeado
  if (req.user) {
    reqUsuario = await usuarioService.mostrarUsuario({
      username: req.user.username,
    });
  } else {
    reqUsuario = false;
  }

  let hayCarrito = await carritoService.mostrarCarrito({
    usuario: reqUsuario.username,
  });
  let urlCarrito; // Se crea la variable param para pasar un valor de numero de carrito u otro si no hay carrito creado.
  if (hayCarrito) {
    urlCarrito = "api/carritos/" + hayCarrito.id + "/productos";
  } else {
    urlCarrito = "#";
  }

  res.render("index", {
    data: await productoService.mostrarTodosProductos(),
    nroC: urlCarrito,
    user: reqUsuario,
  });
};
