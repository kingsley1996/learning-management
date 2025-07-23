import { ReactNode } from 'react';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiPrisma, SiPostgresql } from 'react-icons/si';

export interface TechStackItem {
  name: string;
  icon: ReactNode;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
}

export const techStack: TechStackItem[] = [
  {
    name: 'JavaScript',
    icon: <SiJavascript className="text-yellow-400" />,
    description: 'Nền tảng lập trình web cơ bản'
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript className="text-blue-600" />,
    description: 'JavaScript với type system mạnh mẽ'
  },
  {
    name: 'React.js',
    icon: <SiReact className="text-blue-400" />,
    description: 'Thư viện UI phổ biến nhất hiện nay'
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className="text-black" />,
    description: 'Framework React cho ứng dụng full-stack'
  },
  {
    name: 'Node.js',
    icon: <SiNodedotjs className="text-green-600" />,
    description: 'Runtime JavaScript cho backend'
  },
  {
    name: 'Express.js',
    icon: <SiExpress className="text-gray-600" />, 
    description: 'Framework backend phổ biến cho Node.js'
  },
  {
    name: 'Prisma',
    icon: <SiPrisma className="text-blue-500" />,
    description: 'ORM hiện đại cho Node.js/TypeScript'
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql className="text-blue-700" />,
    description: 'Hệ quản trị CSDL mạnh mẽ'
  }
];

export const features: FeatureItem[] = [
  {
    title: "Mentorship 1-1",
    description: "Học trực tiếp hàng tuần với mentor riêng",
    icon: "👨‍🏫",
  },
  {
    title: "Học Qua Dự Án",
    description: "Xây dựng các dự án thực tế cho portfolio",
    icon: "💼",
  },
  {
    title: "Lịch Học Linh Hoạt",
    description: "Tự do sắp xếp thời gian học phù hợp",
    icon: "🕒",
  },
  {
    title: "Code Review",
    description: "Nhận phản hồi chi tiết về code của bạn",
    icon: "📝",
  },
  {
    title: "Định Hướng Nghề Nghiệp",
    description: "Chuẩn bị phỏng vấn và chiến lược tìm việc",
    icon: "🎯",
  },
  {
    title: "Tham Gia Cộng Đồng",
    description: "Kết nối với cộng đồng lập trình viên",
    icon: "👥",
  }
];

export const curriculum: CurriculumModule[] = [
  {
    title: "Module 1: Nền Tảng Frontend",
    topics: [
      "JavaScript & TypeScript Nâng Cao",
      "React Cơ Bản & Hooks",
      "Next.js 13+ & App Router",
      "Quản Lý State (Redux, Context)",
      "Responsive Design & Tailwind CSS",
    ],
  },
  {
    title: "Module 2: Phát Triển Backend",
    topics: [
      "Node.js & Express",
      "Thiết Kế REST API",
      "Xác Thực & Phân Quyền",
      "Thiết Kế & Mô Hình Hóa Database",
      "MongoDB & Mongoose",
    ],
  },
  {
    title: "Module 3: Chủ Đề Nâng Cao",
    topics: [
      "PostgreSQL & Prisma",
      "Phát Triển GraphQL API",
      "Ứng Dụng Thời Gian Thực",
      "Testing & Documentation",
      "DevOps & Triển Khai",
    ],
  },
  {
    title: "Module 4: Giai Đoạn Dự Án",
    topics: [
      "Kiến Trúc Dự Án Full-stack",
      "Lập Kế Hoạch & Quản Lý Dự Án",
      "Thực Hiện & Best Practices",
      "Tối Ưu Hiệu Suất",
      "Triển Khai & Giám Sát",
    ],
  },
];
