import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    // Xử lý dữ liệu trả về để đảm bảo định dạng nhất quán
    if (result.data) {
      // Nếu có data nhưng là data.data (format API của bạn)
      if (result.data.data !== undefined) {
        result.data = result.data.data;
      }
      // Đảm bảo data không undefined
      if (result.data === undefined) {
        result.data = null;
      }
    } else if (
      result.error?.status === 204 ||
      result.meta?.response?.status === 204
    ) {
      return { data: null };
    }

    // Kiểm tra để đảm bảo response hợp lệ cho RTK Query
    if (result.error === undefined && result.data === undefined) {
      // Nếu không có cả error lẫn data, trả về data null để tránh lỗi
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses", "Users", "UserCourseProgress"],
  endpoints: (build) => ({
    /* 
    ===============
    USER CLERK
    =============== 
    */
    updateUser: build.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `users/clerk/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),

    /* 
    ===============
    COURSES
    =============== 
    */
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    createCourse: build.mutation<
      Course,
      { teacherId: string; teacherName: string }
    >({
      query: (body) => ({
        url: `courses`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),

    updateCourse: build.mutation<
      Course,
      { courseId: string; formData: FormData }
    >({
      query: ({ courseId, formData }) => ({
        url: `courses/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Courses", id: courseId },
      ],
    }),

    deleteCourse: build.mutation<{ message: string }, string>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    getUploadVideoUrl: build.mutation<
      { uploadUrl: string; videoUrl: string },
      {
        courseId: string;
        chapterId: string;
        sectionId: string;
        fileName: string;
        fileType: string;
      }
    >({
      query: ({ courseId, sectionId, chapterId, fileName, fileType }) => ({
        url: `courses/${courseId}/sections/${sectionId}/chapters/${chapterId}/get-upload-url`,
        method: "POST",
        body: { fileName, fileType },
      }),
    }),

    getUploadImageUrl: build.mutation<
      { uploadUrl: string; imageUrl: string },
      {
        courseId: string;
        fileName: string;
        fileType: string;
      }
    >({
      query: ({ courseId, fileName, fileType }) => ({
        url: `courses/${courseId}/get-upload-image-url`,
        method: "POST",
        body: { fileName, fileType },
      }),
    }),

    /* 
    ===============
    TRANSACTIONS
    =============== 
    */
    getTransactions: build.query<Transaction[], string>({
      query: (userId) => `transactions?userId=${userId}`,
    }),
    createStripePaymentIntent: build.mutation<
      { clientSecret: string },
      { amount: number }
    >({
      query: ({ amount }) => ({
        url: `/transactions/stripe/payment-intent`,
        method: "POST",
        body: { amount },
      }),
    }),
    createTransaction: build.mutation<Transaction, Partial<Transaction>>({
      query: (transaction) => ({
        url: "transactions",
        method: "POST",
        body: transaction,
      }),
    }),
    initializeTransaction: build.mutation<
      {
        transactionId: string;
        courseId: string;
        amount: number;
        orderCode: string;
        status: string;
      },
      { userId: string; courseId: string }
    >({
      query: (data) => ({
        url: "transactions/initialize",
        method: "POST",
        body: data,
      }),
    }),
    enrollFreeCourse: build.mutation<
      EnrollFreeCourse,
      Partial<EnrollFreeCourse>
    >({
      query: (freeCourse) => ({
        url: "courses/enroll-free",
        method: "POST",
        body: freeCourse,
      }),
    }),

    /* 
    ===============
    USER COURSE PROGRESS
    =============== 
    */
    getUserEnrolledCourses: build.query<Course[], string>({
      query: (userId) => `users/course-progress/${userId}/enrolled-courses`,
      providesTags: ["Courses", "UserCourseProgress"],
    }),

    getUserCourseProgress: build.query<
      UserCourseProgress,
      { userId: string; courseId: string }
    >({
      query: ({ userId, courseId }) =>
        `users/course-progress/${userId}/courses/${courseId}`,
      providesTags: ["UserCourseProgress"],
    }),

    updateUserCourseProgress: build.mutation<
      UserCourseProgress,
      {
        userId: string;
        courseId: string;
        progressData: {
          sections: SectionProgress[];
        };
      }
    >({
      query: ({ userId, courseId, progressData }) => ({
        url: `users/course-progress/${userId}/courses/${courseId}`,
        method: "PUT",
        body: progressData,
      }),
      invalidatesTags: ["UserCourseProgress"],
      async onQueryStarted(
        { userId, courseId, progressData },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            "getUserCourseProgress",
            { userId, courseId },
            (draft) => {
              Object.assign(draft, {
                ...draft,
                sections: progressData.sections,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    /* 
    ===============
    MENTORING 1-1
    =============== 
    */
    registerMentoring: build.mutation<
      {
        orderCode: string;
        imageQR: string;
        transactionId: string;
        amount: number;
        status: string;
      },
      {
        fullName: string;
        email: string;
        phoneNumber: string;
        goal?: string;
        experience?: string;
        availability?: string;
        userId?: string | null;
      }
    >({
      query: (registrationData) => ({
        url: "mentoring/register",
        method: "POST",
        body: registrationData,
      }),
    }),

    checkMentoringStatus: build.query<
      { status: string; transactionId: string },
      string
    >({
      query: (orderCode) => ({
        url: `mentoring/order/${orderCode}/status`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // Đảm bảo response luôn hợp lệ
        if (!response) {
          return { status: "pending", transactionId: "" };
        }
        // Đảm bảo có thuộc tính status và transactionId
        return {
          status: response.status || "pending",
          transactionId: response.transactionId || "",
        };
      },
      // Xử lý lỗi để không làm crash ứng dụng
      transformErrorResponse: (error: any) => {
        console.error("Error in checkMentoringStatus:", error);
        return {
          status: "error",
          data: { status: "error", transactionId: "" },
        };
      },
    }),

    getMentoringDetails: build.query<
      {
        orderCode: string;
        status: string;
        amount: number;
        imageQR: string;
        dateTime: string;
        mentoringDetails: {
          fullName: string;
          email: string;
          phoneNumber: string;
          goal: string;
          experience: string;
          availability: string;
        };
      },
      string
    >({
      query: (transactionId) => `mentoring/order/${transactionId}`,
    }),

    // API lấy danh sách đơn đăng ký mentoring
    getAllMentoringOrders: build.query<
      {
        totalOrders: number;
        currentPage: number;
        totalPages: number;
        totalByStatus: {
          success: number;
          pending: number;
          failed: number;
        };
        orders: Array<{
          orderCode: string;
          status: string;
          amount: number;
          dateTime: string;
          mentoringDetails: {
            fullName: string;
            email: string;
            phoneNumber: string;
            goal: string;
            experience: string;
            availability: string;
          };
          userId: string;
        }>;
      },
      { page: number; limit: number; status?: string }
    >({
      query: (params) => {
        const { page, limit, status } = params;
        let url = `mentoring/orders?page=${page}&limit=${limit}`;
        if (status) url += `&status=${status}`;
        return url;
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetUploadVideoUrlMutation,
  useGetUploadImageUrlMutation,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useCreateStripePaymentIntentMutation,
  useInitializeTransactionMutation,
  useGetUserEnrolledCoursesQuery,
  useGetUserCourseProgressQuery,
  useUpdateUserCourseProgressMutation,
  useEnrollFreeCourseMutation,
  useRegisterMentoringMutation,
  useCheckMentoringStatusQuery,
  useGetMentoringDetailsQuery,
  useGetAllMentoringOrdersQuery,
} = api;
