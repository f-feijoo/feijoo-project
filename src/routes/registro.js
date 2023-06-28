import express from "express";
import multer from "multer";
import {
  errorRegistro,
  getRegistro,
  registrar,
} from "../controllers/registroController.js";

const { Router } = express;

let router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage });

router.get("/", getRegistro);

router.post("/", upload.single("avatar"), registrar);

router.get("/errorRegistro", errorRegistro);

export default router;
