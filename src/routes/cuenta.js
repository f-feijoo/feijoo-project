import express from "express";
import { mostrarCuenta, modificarCuenta, actualizarCuenta } from "../controllers/cuentaController.js";

const { Router } = express;

let router = new Router();

router.get("/", mostrarCuenta);

router.get("/modificar", modificarCuenta)

router.post("/", actualizarCuenta)

export default router;
