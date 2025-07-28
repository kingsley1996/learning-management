import Stripe from "stripe";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Course from "../models/courseModel";
import Transaction from "../models/transactionModel";
import UserCourseProgress from "../models/userCourseProgressModel";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY os required but was not found in env variables"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const listTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.query;

  try {
    const transactions = userId
      ? await Transaction.query("userId").eq(userId).exec()
      : await Transaction.scan().exec();

    res.json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions", error });
  }
};

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "vnd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({
      message: "",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating stripe payment intent", error });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

  try {
    // 1. get course info
    const course = await Course.get(courseId);

    // 2. create transaction record
    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider,
    });
    await newTransaction.save();

    // 3. create initial course progress
    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: course.sections.map((section: any) => ({
        sectionId: section.sectionId,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.chapterId,
          completed: false,
        })),
      })),
      lastAccessedTimestamp: new Date().toISOString(),
    });
    await initialProgress.save();

    // 4. add enrollment to relevant course
    await Course.update(
      { courseId },
      {
        $ADD: {
          enrollments: [{ userId }],
        },
      }
    );

    res.json({
      message: "Purchased Course successfully",
      data: {
        transaction: newTransaction,
        courseProgress: initialProgress,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction and enrollment", error });
  }
};

// API tạo order VietQR
export const createVietQROrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, courseId, amount } = req.body;
    if (!courseId || !amount) {
      res
        .status(400)
        .json({ message: "Missing required fields (courseId, amount)" });
      return;
    }
    const course = await Course.get(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    // Tạo orderCode: CWS + 6 số ngẫu nhiên
    const orderCode = `CWS${Math.floor(100000 + Math.random() * 900000)}`;
    // Sinh QR code đúng định dạng VietQR
    const BANK = process.env.VIETQR_BANK || "VCB";
    const BANK_NUMBER = process.env.VIETQR_BANK_NUMBER || "0123456789";
    const ACCOUNT_NAME = process.env.VIETQR_ACCOUNT_NAME || "TEN TAI KHOAN";
    const imageQR = `https://img.vietqr.io/image/${BANK}-${BANK_NUMBER}-compact.png?amount=${amount}&addInfo=${orderCode}&accountName=${encodeURIComponent(
      ACCOUNT_NAME
    )}`;
    // Lưu transaction
    const transaction = new Transaction({
      userId: userId || null,
      transactionId: uuidv4(),
      dateTime: new Date().toISOString(),
      courseId,
      paymentProvider: "vietqr",
      amount,
      currency: "vnd",
      status: "pending",
      imageQR,
      orderCode,
    });
    console.log("transaction: ", transaction);
    await transaction.save();
    res.json({
      message: "Order created",
      data: {
        orderCode,
        imageQR,
        course,
        status: "pending",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating VietQR order", error });
  }
};

// API lấy trạng thái order
export const getOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderCode } = req.params;
    console.log("Checking status for orderCode:", orderCode);
    
    // Sử dụng scan thay vì query vì có vấn đề với index
    const transactions = await Transaction.scan()
      .where("orderCode")
      .eq(orderCode)
      .exec();
    
    if (!transactions || transactions.length === 0) {
      console.log("Order not found for orderCode:", orderCode);
      res.status(404).json({ message: "Order not found" });
      return;
    }
    
    console.log("Found order with status:", transactions[0].status);
    res.json({ status: transactions[0].status });
  } catch (error) {
    console.error("Error checking order status:", error);
    res.status(500).json({ message: "Error checking order status", error });
  }
};

// Webhook sepay cập nhật trạng thái order
export const sepayWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("SePay webhook received:", JSON.stringify(req.body, null, 2));
    
    // Phân tích dữ liệu từ webhook
    const webhookData = req.body;
    
    // Tách orderCode từ nội dung chuyển khoản (content)
    // SePay sẽ gửi nội dung chuyển khoản trong field 'content' hoặc 'description'
    const content = webhookData.content || webhookData.description || "";
    
    // Tìm mã CWS + 6 chữ số trong nội dung
    const orderCodeMatch = content.match(/CWS\d{6}/);
    const orderCode = orderCodeMatch ? orderCodeMatch[0] : null;
    
    if (!orderCode) {
      console.error("Không tìm thấy orderCode trong nội dung:", content);
      res.status(400).json({ message: "Invalid content in webhook data. OrderCode not found." });
      return;
    }
    
    console.log(`Tìm thấy orderCode: ${orderCode}`);
    
    // Tìm transaction với orderCode
    const transactionArr = await Transaction.scan()
      .where("orderCode")
      .eq(orderCode)
      .exec();
      
    if (!transactionArr || transactionArr.length === 0) {
      console.error(`Transaction với orderCode ${orderCode} không tồn tại`);
      res.status(404).json({ message: "Order not found" });
      return;
    }
    
    const transaction = transactionArr[0];
    
    // Kiểm tra số tiền thanh toán
    const transferAmount = webhookData.transferAmount || webhookData.amount;
    if (transferAmount && transferAmount !== transaction.amount) {
      console.error(`Số tiền thanh toán (${transferAmount}) không khớp với số tiền đơn hàng (${transaction.amount})`);
      // Từ chối giao dịch khi số tiền không khớp
      res.status(400).json({ 
        message: "Payment amount does not match order amount", 
        expected: transaction.amount,
        received: transferAmount
      });
      return;
    }
    
    // Cập nhật trạng thái transaction
    transaction.status = "success"; // Mặc định là thành công nếu nhận được webhook
    transaction.extraInfo = {
      webhookData: webhookData,
      processedAt: new Date().toISOString()
    };
    
    // Tìm thông tin khóa học
    console.log(`Lấy thông tin khóa học: ${transaction.courseId}`);
    const course = await Course.get(transaction.courseId);
    
    if (!course) {
      console.error(`Không tìm thấy khóa học với ID: ${transaction.courseId}`);
      res.status(400).json({ message: `Course with ID ${transaction.courseId} not found` });
      return;
    }
    
    try {
      // Kiểm tra xem người dùng đã có course progress cho khóa học này chưa
      const existingProgress = await UserCourseProgress.query("userId")
        .eq(transaction.userId)
        .where("courseId")
        .eq(transaction.courseId)
        .exec();
      
      if (existingProgress && existingProgress.length > 0) {
        console.log(`User ${transaction.userId} đã có progress cho khóa học ${transaction.courseId}, không tạo mới`);
      } else {
        // Tạo course progress mới
        console.log(`Tạo course progress cho user ${transaction.userId} và khóa học ${transaction.courseId}`);
        const initialProgress = new UserCourseProgress({
          userId: transaction.userId,
          courseId: transaction.courseId,
          enrollmentDate: new Date().toISOString(),
          overallProgress: 0,
          sections: course.sections.map((section: any) => ({
            sectionId: section.sectionId,
            chapters: section.chapters.map((chapter: any) => ({
              chapterId: chapter.chapterId,
              completed: false,
            })),
          })),
          lastAccessedTimestamp: new Date().toISOString(),
        });
        
        await initialProgress.save();
        console.log("Course progress đã được tạo");
      }
      
      // Kiểm tra xem người dùng đã được enrollment vào khóa học chưa
      const courseDetails = await Course.get(transaction.courseId);
      const isAlreadyEnrolled = courseDetails.enrollments && 
        courseDetails.enrollments.some((enrollment: any) => enrollment.userId === transaction.userId);
      
      if (isAlreadyEnrolled) {
        console.log(`User ${transaction.userId} đã được enrollment vào khóa học ${transaction.courseId}`);
      } else {
        // Thêm enrollment vào khóa học
        console.log(`Thêm enrollment cho user ${transaction.userId} vào khóa học ${transaction.courseId}`);
        await Course.update(
          { courseId: transaction.courseId },
          {
            $ADD: {
              enrollments: [{ userId: transaction.userId }],
            },
          }
        );
        
        console.log(`Enrollment thành công cho user ${transaction.userId} vào khóa học ${transaction.courseId}`);
      }
    } catch (enrollmentError) {
      console.error("Lỗi khi xử lý enrollment:", enrollmentError);
      // Vẫn cập nhật trạng thái thanh toán thành công, xử lý enrollment sau nếu cần
    }
    
    // Lưu cập nhật transaction
    await transaction.save();
    console.log(`Transaction ${orderCode} đã được cập nhật thành công`);
    
    // Trả về kết quả thành công
    res.json({ 
      message: "Order status updated successfully",
      data: {
        orderCode,
        status: transaction.status,
        courseId: transaction.courseId,
        userId: transaction.userId
      }
    });
  } catch (error) {
    console.error("Error in webhook:", error);
    res.status(500).json({ message: "Error in webhook", error });
  }
};

// API lấy order pending cho user + course (userId optional)
export const getPendingOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, courseId } = req.query;
    if (!courseId) {
      res.status(400).json({ message: "Missing courseId" });
      return;
    }

    console.log("Tìm order với - userId:", userId, "courseId:", courseId);

    // Cách tiếp cận sử dụng object để filter trong Dynamoose
    const scanParams: any = {
      courseId: String(courseId),
      status: "pending",
    };

    if (userId) {
      scanParams.userId = String(userId);
    }

    const orders = await Transaction.scan(scanParams).limit(1).exec();

    if (orders && orders.length > 0) {
      res.json({
        data: {
          ...orders[0],
          orderCode: orders[0].orderCode,
          imageQR: orders[0].imageQR,
        },
      });
    } else {
      res.json({ data: null });
    }
  } catch (error) {
    console.error("Error in getPendingOrder:", error);
    res.status(500).json({ message: "Error fetching pending order", error });
  }
};

// API khởi tạo transaction VietQR khi người dùng bấm "Tham gia"
export const initializeTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, courseId } = req.body;
    
    if (!userId || !courseId) {
      res.status(400).json({ 
        message: "Missing required fields (userId, courseId)" 
      });
      return;
    }
    
    // Kiểm tra xem course có tồn tại không
    const course = await Course.get(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    
    // Lấy giá của khóa học
    const amount = course.price || 0;
    
    // Tạo orderCode: CWS + 6 số ngẫu nhiên
    const orderCode = `CWS${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Tạo transaction mới với trạng thái "initialized"
    const transactionId = uuidv4();
    const transaction = new Transaction({
      userId,
      transactionId,
      dateTime: new Date().toISOString(),
      courseId,
      paymentProvider: "vietqr",
      amount,
      currency: "vnd",
      status: "initialized", // Trạng thái khởi tạo
      orderCode,
      // imageQR sẽ được tạo sau khi người dùng vào trang thanh toán
    });
    
    console.log("Khởi tạo transaction:", transaction);
    await transaction.save();
    
    res.json({
      message: "Transaction initialized successfully",
      data: {
        transactionId,
        courseId,
        amount,
        orderCode,
        status: "initialized"
      }
    });
  } catch (error) {
    console.error("Error initializing transaction:", error);
    res.status(500).json({ message: "Error initializing transaction", error });
  }
};

// API lấy thông tin transaction theo ID
export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { transactionId } = req.params;
    
    if (!transactionId) {
      res.status(400).json({ message: "Missing transactionId" });
      return;
    }
    
    console.log(`Tìm transaction với ID: ${transactionId}`);
    
    // Sử dụng scan vì chưa có index cho transactionId
    const transactions = await Transaction.scan()
      .where("transactionId")
      .eq(transactionId)
      .exec();
    
    if (!transactions || transactions.length === 0) {
      console.log(`Transaction với ID ${transactionId} không tồn tại`);
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    
    const transaction = transactions[0];
    
    // Lấy thông tin khóa học
    const course = await Course.get(transaction.courseId);
    
    // Sinh QR code nếu trạng thái là initialized (chỉ khi vào trang thanh toán)
    if (transaction.status === "initialized") {
      // Sinh QR code đúng định dạng VietQR
      const BANK = process.env.VIETQR_BANK || "VCB";
      const BANK_NUMBER = process.env.VIETQR_BANK_NUMBER || "0123456789";
      const ACCOUNT_NAME = process.env.VIETQR_ACCOUNT_NAME || "TEN TAI KHOAN";
      const imageQR = `https://img.vietqr.io/image/${BANK}-${BANK_NUMBER}-compact.png?amount=${transaction.amount}&addInfo=${transaction.orderCode}&accountName=${encodeURIComponent(
        ACCOUNT_NAME
      )}`;
      
      // Cập nhật transaction với QR code và trạng thái "pending"
      transaction.imageQR = imageQR;
      transaction.status = "pending";
      await transaction.save();
    }
    
    res.json({
      message: "Transaction retrieved successfully",
      data: {
        ...transaction,
        course
      }
    });
  } catch (error) {
    console.error("Error retrieving transaction:", error);
    res.status(500).json({ message: "Error retrieving transaction", error });
  }
};
