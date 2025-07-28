import { Schema, model } from "dynamoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: String,
      hashKey: true,
      required: true,
    },
    transactionId: {
      type: String,
      rangeKey: true,
      required: true,
      index: {
        name: "TransactionIdIndex",
        type: "global",
      },
    },
    dateTime: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
      index: {
        name: "CourseTransactionsIndex",
        type: "global",
      },
    },
    paymentProvider: {
      type: String,
      enum: ["stripe", "vietqr"],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: {
      type: String,
      enum: ["vnd"],
      default: "vnd",
      required: true,
    },
    status: {
      type: String,
      enum: ["initialized", "pending", "success", "failed", "expired"],
      default: "initialized",
      required: true,
    },
    imageQR: {
      type: String,
      required: false,
    },
    orderCode: {
      type: String,
      required: true,
      index: {
        name: "OrderCodeIndex",
        type: "global",
      },
    },
    extraInfo: {
      type: Object,
      required: false,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
