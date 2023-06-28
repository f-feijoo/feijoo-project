import express from "express";
import { errorLogin, getLogin, login } from "../controllers/loginController.js";

const { Router } = express;

let router = new Router();

router.get("/", getLogin);

router.post("/", login);

router.get("/errorLogin", errorLogin);

export default router;
