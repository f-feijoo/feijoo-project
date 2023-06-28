import { UsuarioService } from "../services/usuarioService.js";
import { CarritoService } from "../services/carritoService.js";

const carritoService = new CarritoService();
const usuarioService = new UsuarioService();

export const info = async (req, res) => {
  let carrito = await carritoService.mostrarCarrito({
    usuario: req.user.username,
  });
  let param;
  if (carrito) {
    param = "api/carritos/" + carrito.id + "/productos";
  } else {
    param = "#";
  }
  res.render("info", {
    nroC: param,
    user: await usuarioService.mostrarUsuario({ username: req.user.username }),
  });
};
