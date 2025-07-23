export interface Course {
  courseId: string;
  teacherId: string;
  title: string;
  description: string;
  price: number;
  isFreeCourse: boolean;
  category: string;
  level: string;
  status: string;
  image?: string;
  teacherName?: string;
  sections?: Array<{
    id: string;
    title: string;
    lessons?: Array<{
      id: string;
      title: string;
    }>;
  }>;
  enrollments?: Array<{
    userId: string;
  }>;
}
