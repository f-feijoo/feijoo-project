import express from "express";
import {
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  mostrarProducto,
  mostrarProductos,
  mostrarProductoCategoria
} from "../controllers/productosController.js";

const { Router } = express;

const productosRouter = new Router();

productosRouter.get("/", mostrarProductos);

productosRouter.get("/:id", mostrarProducto);

productosRouter.get("/categoria/:categoria", mostrarProductoCategoria);

// PARA ACCEDER USAR QUERY PARAMS ADMIN=TRUE

productosRouter.post("/", agregarProducto);

productosRouter.put("/:id", actualizarProducto);

productosRouter.delete("/:id", eliminarProducto);

export default productosRouter;
