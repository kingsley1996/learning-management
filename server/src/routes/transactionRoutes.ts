import express from "express";
import {
  createStripePaymentIntent,
  createTransaction,
  listTransactions,
  createVietQROrder,
  getOrderStatus,
  getPendingOrder,
  initializeTransaction,
  getTransactionById,
} from "../controllers/transactionController";

const router = express.Router();

router.get("/", listTransactions);
router.post("/", createTransaction);
router.post("/stripe/payment-intent", createStripePaymentIntent);
router.post("/vietqr/order", createVietQROrder);
router.get("/order/:orderCode/status", getOrderStatus);
router.get("/pending", getPendingOrder);
router.post("/initialize", initializeTransaction);
router.get("/:transactionId", getTransactionById);

export default router;
