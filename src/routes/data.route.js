import { Router } from "express";
import { fetchData } from "../data/fetch.js";
import { protectRoute } from "../db/middleware.js";

const router = Router();

router.post("/fetch", protectRoute, fetchData);

export default router;