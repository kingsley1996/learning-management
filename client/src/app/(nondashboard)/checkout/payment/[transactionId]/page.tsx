"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CoursePreview from "@/components/CoursePreview";
import Image from "next/image";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/transactions";

const TransactionPaymentPage = () => {
  const { transactionId } = useParams();
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [transaction, setTransaction] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { navigateToStep } = useCheckoutNavigation();

  // Tải thông tin transaction
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!user?.id || !transactionId) return;
      
      try {
        setLoading(true);
        const token = await getToken();
        const res = await fetch(`${API_BASE}/${transactionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await res.json();
        
        if (data.data) {
          setTransaction(data.data);
          setCourse(data.data.course);
        } else {
          toast.error(data.message || "Không tìm thấy thông tin giao dịch");
          router.push("/");
        }
      } catch (err) {
        toast.error("Lỗi khi tải thông tin giao dịch");
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) {
      fetchTransactionDetails();
    }
  }, [user?.id, transactionId, getToken, router]);

  // Polling trạng thái transaction
  useEffect(() => {
    if (!transaction?.orderCode) return;
    
    let stopped = false;
    const poll = async () => {
      const token = await getToken();
      try {
        const res = await fetch(`${API_BASE}/order/${transaction.orderCode}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await res.json();
        
        if (data.status === "success") {
          toast.success("Thanh toán thành công!");
          stopped = true;
          
          // Chuyển user sang trang completion
          setTimeout(() => {
            navigateToStep(3);
          }, 1500);
          return;
        } else if (data.status === "failed") {
          toast.error("Thanh toán thất bại. Vui lòng thử lại.");
          stopped = true;
          return;
        }
      } catch (err) {
        // Có thể log lỗi nếu cần
      }
      if (!stopped) setTimeout(poll, 3000);
    };
    
    poll();
    
    return () => {
      stopped = true;
    };
  }, [transaction?.orderCode, transaction?.courseId, getToken, router, navigateToStep]);

  if (!course || !user?.id) return null;

  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__preview">
          <CoursePreview course={course} />
        </div>
        <div className="payment__form-container">
          <div className="payment__content">
            <h1 className="payment__title">Thanh toán qua VietQR</h1>
            <p className="payment__subtitle">
              Quét mã QR bên dưới để hoàn tất giao dịch.
            </p>
            {loading ? (
              <div className="payment__loading">
                <p className="mt-3">Đang tạo mã QR...</p>
              </div>
            ) : transaction?.imageQR ? (
              <div style={{ textAlign: "center" }}>
                <Image
                  src={transaction.imageQR}
                  alt="QR code"
                  width={300}
                  height={300}
                  style={{ margin: "0 auto" }}
                />
                <p>
                  Mã đơn hàng: <b>{transaction.orderCode}</b>
                </p>
                <p>
                  Số tiền: <b>{transaction.amount?.toLocaleString()} VND</b>
                </p>
                <p>Đang chờ xác nhận thanh toán...</p>
              </div>
            ) : (
              <p>Không thể tạo mã QR. Vui lòng thử lại sau.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Đổi tên component để tránh nhầm lẫn
export default TransactionPaymentPage;
