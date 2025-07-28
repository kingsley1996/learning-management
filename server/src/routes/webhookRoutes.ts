import express from "express";
import { sepayWebhook } from "../controllers/transactionController";

const router = express.Router();

router.post("/sepay", sepayWebhook);

export default router;
