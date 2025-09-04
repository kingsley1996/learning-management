import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Transaction from "../models/transactionModel";

dotenv.config();

interface MentoringRegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  goal: string;
  experience: string;
  availability: string;
  userId?: string; // Optional if user is not logged in
}

// API đăng ký mentoring 1-1 và tạo đơn hàng QR
export const registerMentoring = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const registrationData: MentoringRegistrationData = req.body;
    const { fullName, email, phoneNumber, goal, experience, availability, userId } = registrationData;
    
    // Validate required fields
    if (!fullName || !email || !phoneNumber) {
      res.status(400).json({ 
        message: "Missing required fields (fullName, email, phoneNumber)" 
      });
      return;
    }
    
    // Set fixed courseId for mentoring 1-1
    const courseId = "mentoring-1-1"; // Mã cố định cho khóa học 1-1
    
    // Set fixed price for mentoring
    const amount = 2490000; // 2.490.000 VND

    // Tạo orderCode: CWS11 + 6 số ngẫu nhiên
    const orderCode = `CWS11${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Sinh QR code đúng định dạng VietQR
    const BANK = process.env.VIETQR_BANK || "VCB";
    const BANK_NUMBER = process.env.VIETQR_BANK_NUMBER || "0123456789";
    const ACCOUNT_NAME = process.env.VIETQR_ACCOUNT_NAME || "TEN TAI KHOAN";
    const imageQR = `https://img.vietqr.io/image/${BANK}-${BANK_NUMBER}-compact.png?amount=${amount}&addInfo=${orderCode}&accountName=${encodeURIComponent(
      ACCOUNT_NAME
    )}`;
    
    // Lưu transaction
    const transaction = new Transaction({
      userId: userId || "anonymous-" + uuidv4().slice(0, 8), // Tạo anonymous ID nếu không có userId
      transactionId: uuidv4(),
      dateTime: new Date().toISOString(),
      courseId,
      paymentProvider: "vietqr",
      amount,
      currency: "vnd",
      status: "pending",
      imageQR,
      orderCode,
      mentoringDetails: {
        fullName,
        email,
        phoneNumber,
        goal: goal || "",
        experience: experience || "",
        availability: availability || ""
      }
    });
    
    await transaction.save();
    
    res.status(201).json({
      message: "Mentoring registration successful",
      data: {
        orderCode,
        imageQR,
        transactionId: transaction.transactionId,
        amount,
        status: "pending"
      }
    });
  } catch (error) {
    console.error("Error in mentoring registration:", error);
    res.status(500).json({ message: "Error processing mentoring registration", error });
  }
};

// API kiểm tra trạng thái đơn hàng mentoring
export const checkMentoringOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderCode } = req.params;
    console.log("Checking mentoring order status for orderCode:", orderCode);
    
    // Sử dụng scan thay vì query vì có vấn đề với index
    const transactions = await Transaction.scan()
      .where("orderCode")
      .eq(orderCode)
      .exec();
    
    if (!transactions || transactions.length === 0) {
      console.log("Mentoring order not found for orderCode:", orderCode);
      res.status(404).json({ message: "Order not found" });
      return;
    }
    
    console.log("Found mentoring order with status:", transactions[0].status);
    res.json({ 
      status: transactions[0].status,
      transactionId: transactions[0].transactionId 
    });
  } catch (error) {
    console.error("Error checking mentoring order status:", error);
    res.status(500).json({ message: "Error checking order status", error });
  }
};

// API lấy thông tin đơn hàng mentoring
export const getMentoringOrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { transactionId } = req.params;
    
    // Sử dụng scan để tìm transaction
    const transactions = await Transaction.scan()
      .where("transactionId")
      .eq(transactionId)
      .exec();
    
    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: "Mentoring order not found" });
      return;
    }
    
    const transaction = transactions[0];
    
    // Chỉ trả về thông tin cần thiết
    res.json({
      message: "Mentoring order details retrieved successfully",
      data: {
        orderCode: transaction.orderCode,
        status: transaction.status,
        amount: transaction.amount,
        imageQR: transaction.imageQR,
        dateTime: transaction.dateTime,
        mentoringDetails: transaction.mentoringDetails
      }
    });
  } catch (error) {
    console.error("Error retrieving mentoring order:", error);
    res.status(500).json({ message: "Error retrieving mentoring order", error });
  }
};

// API lấy danh sách tất cả đơn hàng mentoring (cho trang admin)
export const getAllMentoringOrders = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", status } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    
    // Sử dụng Dynamoose model method thay vì tạo params thủ công
    let query = Transaction.scan().where("courseId").eq("mentoring-1-1");
    
    // Nếu có status, thêm filter
    if (status) {
      query = query.where("status").eq(status);
    }
    
    // Lấy tất cả kết quả (DynamoDB không hỗ trợ phân trang như MongoDB)
    const result = await query.exec();
    const allItems = result.toJSON();
    
    // Tạo bộ đếm theo trạng thái
    const statusCounts = {
      success: 0,
      pending: 0,
      failed: 0
    };
    
    // Đếm số lượng theo trạng thái
    allItems.forEach((item: any) => {
      if (item.status === 'success') statusCounts.success++;
      else if (item.status === 'pending') statusCounts.pending++;
      else if (item.status === 'failed') statusCounts.failed++;
    });
    
    // Tự triển khai phân trang
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedItems = allItems.slice(startIndex, endIndex);
    
    // Định dạng lại dữ liệu để khớp với API client
    const formattedOrders = paginatedItems.map((item: any) => ({
      orderCode: item.orderCode,
      status: item.status,
      amount: item.amount,
      dateTime: item.dateTime,
      mentoringDetails: item.mentoringDetails || {
        fullName: "",
        email: "",
        phoneNumber: "",
        goal: "",
        experience: "",
        availability: ""
      },
      userId: item.userId
    }));
    
    res.status(200).json({
      status: "success",
      data: {
        totalOrders: allItems.length,
        currentPage: pageNumber,
        totalPages: Math.ceil(allItems.length / limitNumber),
        totalByStatus: statusCounts,
        orders: formattedOrders
      }
    });
  } catch (error) {
    console.error("Error retrieving mentoring orders:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error retrieving mentoring orders", 
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
