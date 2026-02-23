// backend/routes/health.routes.js
import express from "express";
import { pingDb } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/db", pingDb);  // GET /api/health/db

export default router;