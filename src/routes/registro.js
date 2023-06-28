import express from "express";
import multer from "multer";
import {
  errorRegistro,
  getRegistro,
  registrar,
} from "../controllers/registroController.js";

const { Router } = express;

let router = new Router();

router.get("/", getRegistro);

router.post("/", registrar);

router.get("/errorRegistro", errorRegistro);

export default router;
