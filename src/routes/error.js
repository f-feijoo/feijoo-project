import express from "express";
import { errorLog } from "../controllers/errorController.js";

const { Router } = express;

let router = new Router();

router.get("*", errorLog);

router.post("*", errorLog);

router.put("*", errorLog);

router.delete("*", errorLog);

export default router;
