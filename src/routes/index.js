import express from "express";
import { index } from "../controllers/indexController.js";

const { Router } = express;

const router = new Router();

router.get("/", index);

export default router;
