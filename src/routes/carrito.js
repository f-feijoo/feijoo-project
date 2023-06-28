import express from "express";
import {
  mostrarCarrito,
  agregarProducto,
  finalizarCarrito,
  crearCarrito,
  eliminarCarrito,
  eliminarProducto,
} from "../controllers/carritoController.js";

const { Router } = express;

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

const carritoRouter = new Router();

carritoRouter.get("/:id/productos", auth, mostrarCarrito);

carritoRouter.post("/:id/productos", auth, agregarProducto);

carritoRouter.get("/:id/productos/finalizar", auth, finalizarCarrito);

carritoRouter.post("/", auth, crearCarrito);

carritoRouter.delete("/:id", auth, eliminarCarrito);

carritoRouter.delete("/:id/productos/:id_prod", auth, eliminarProducto);

export default carritoRouter;
