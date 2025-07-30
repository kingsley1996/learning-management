"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Import API
import { useGetAllMentoringOrdersQuery } from "@/state/api";

// Định nghĩa cột
const columns = [
  {
    accessorKey: "orderCode",
    header: "Mã đơn hàng",
  },
  {
    accessorKey: "dateTime",
    header: "Thời gian",
    cell: ({ row }: { row: any }) => {
      const dateTime = row.getValue("dateTime");
      if (!dateTime) return "N/A";
      
      return format(new Date(dateTime), "dd/MM/yyyy HH:mm", { locale: vi });
    }
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }: { row: any }) => {
      const status = row.getValue("status");
      
      let badgeStyle = "";
      let statusText = "";
      
      switch(status) {
        case "success":
          badgeStyle = "bg-green-500";
          statusText = "Thành công";
          break;
        case "pending":
          badgeStyle = "bg-yellow-500";
          statusText = "Đang chờ";
          break;
        case "failed":
          badgeStyle = "bg-red-500";
          statusText = "Thất bại";
          break;
        default:
          badgeStyle = "bg-gray-500";
          statusText = status || "Không xác định";
      }
      
      return <Badge className={badgeStyle}>{statusText}</Badge>;
    }
  },
  {
    accessorKey: "amount",
    header: "Số tiền",
    cell: ({ row }: { row: any }) => {
      const amount = row.getValue("amount");
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(amount || 0);
    }
  },
  {
    accessorKey: "mentoringDetails.fullName",
    header: "Họ tên",
  },
  {
    accessorKey: "mentoringDetails.email",
    header: "Email",
  },
  {
    accessorKey: "mentoringDetails.phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "actions",
    header: "Hành động",
    cell: ({ row }: { row: any }) => {
      const orderCode = row.getValue("orderCode");
      
      return (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.open(`/admin/mentoring/${orderCode}`, '_blank')}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            Chi tiết
          </button>
        </div>
      );
    }
  }
];

export default function MentoringAdminPage() {
  const [page, setPage] = useState(1);
  
  // Fetch data từ API
  const { data: ordersData, isLoading } = useGetAllMentoringOrdersQuery({ 
    page, 
    limit: 10 
  });
  
  console.log("Orders data from API:", ordersData);
  
  // Trích xuất dữ liệu để sử dụng trong component
  const orders = ordersData?.orders || [];
  const totalByStatus = ordersData?.totalByStatus || { success: 0, pending: 0, failed: 0 };
  const totalOrders = ordersData?.totalOrders || 0;
  const totalPages = ordersData?.totalPages || 1;

  console.log("Total orders:", totalOrders);
  console.log("Total by status:", totalByStatus); 
    console.log("Total pages:", totalPages);  
    console.log("orders:", orders);
  
  if (isLoading) {
    return (
      <div className="p-6">
        <Heading title="Đơn đăng ký và thanh toán 1-1 Mentoring" description="Quản lý các đơn đăng ký và thanh toán khóa học 1-1" />
        <Separator className="my-6" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <Heading title="Đơn đăng ký và thanh toán 1-1 Mentoring" description="Quản lý các đơn đăng ký và thanh toán khóa học 1-1" />
      <Separator className="my-6" />
      
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500">Thành công: {totalByStatus.success}</Badge>
          <Badge className="bg-yellow-500">Đang chờ: {totalByStatus.pending}</Badge>
          <Badge className="bg-red-500">Thất bại: {totalByStatus.failed}</Badge>
          <Badge className="bg-blue-500">Tổng: {totalOrders}</Badge>
        </div>
      </div>
      
      <DataTable 
        columns={columns} 
        data={orders} 
        searchKey="mentoringDetails.fullName" 
        searchPlaceholder="Tìm theo tên học viên..."
        onPaginationChange={(page) => setPage(page)}
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  );
}
