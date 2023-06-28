import express from "express";
import { info } from "../controllers/infoController.js";

const { Router } = express;

let router = new Router();

router.get("/", info);

export default router;
