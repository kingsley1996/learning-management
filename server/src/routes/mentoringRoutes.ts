import express from "express";
import {
  registerMentoring,
  checkMentoringOrderStatus,
  getMentoringOrderDetails,
  getAllMentoringOrders
} from "../controllers/mentoringController";

const router = express.Router();

// API đăng ký mentoring 1-1
router.post("/register", registerMentoring);

// API kiểm tra trạng thái đơn hàng
router.get("/order/:orderCode/status", checkMentoringOrderStatus);

// API lấy thông tin đơn hàng
router.get("/order/:transactionId", getMentoringOrderDetails);

// API lấy danh sách tất cả đơn hàng mentoring (cho trang admin)
router.get("/orders", getAllMentoringOrders);

export default router;
