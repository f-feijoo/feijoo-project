import express from "express";
import { logout } from "../controllers/logoutController.js";

const { Router } = express;

let router = new Router();

router.get("/", logout);

  export default router