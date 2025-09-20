"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Code2, 
  Database, 
  Globe,
  Library,
  Server,
  Terminal,
  Laptop,
  BrainCircuit
} from "lucide-react";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: JSX.Element;
  color: string;
  subtopics?: {
    title: string;
    description: string;
    resources?: { title: string; url: string }[];
  }[];
}

const frontendRoadmap: RoadmapNode[] = [
  {
    id: "Internet",
    title: "Internet",
    description: "Hiểu cách thức hoạt động của Internet",
    duration: "1-3 ngày",
    skills: ["Http", "Domain", "Hosting", "Browser", "DNS"],
    difficulty: "Beginner",
    icon: <Globe className="w-6 h-6" />,
    color: "#3B82F6",
    subtopics: [
      {
        title: "Cách Internet Hoạt Động",
        description: "Tìm hiểu về cách thức hoạt động của Internet, bao gồm các giao thức cơ bản như HTTP và HTTPS.",
        resources: [
            { title: "How the Internet Works - MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_the_Internet_works" },
        ]
      },
      {
        title: "HTTP và HTTPS",
        description: "Khám phá cách thức hoạt động của HTTP và HTTPS, bao gồm các khái niệm như request, response, và SSL/TLS.",
        resources: [
          { title: "MDN Web Docs - HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" },
          { title: "W3Schools - HTTP Tutorial", url: "https://www.w3schools.com/tags/ref_httpmethods.asp" }
        ]
      },
      {
        title: "DNS là gì?",
        description: "Tìm hiểu về hệ thống tên miền (DNS) và cách nó hoạt động.",
        resources: [
          { title: "MDN Web Docs - DNS", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Domain_names" },
          { title: "W3Schools - DNS Tutorial", url: "https://www.w3schools.com/whatis/whatis_dns.asp" }
        ]
      }
    ]
  },
  {
    id: "Html",
    title: "HTML",
    description: "Học cấu trúc cơ bản của trang web",
    duration: "1-2 tuần",
    skills: ["HTML5", "Semantic HTML", "Forms", "Accessibility"],
    difficulty: "Intermediate",
    icon: <Laptop className="w-6 h-6" />,
    color: "#8B5CF6",
    subtopics: [
              {
        title: "Các thẻ HTML Cơ Bản",
        description: "Tìm hiểu về các thẻ HTML cơ bản như <div>, <span>, <a>, <img>, và cách sử dụng chúng để xây dựng cấu trúc trang web.",
        resources: [
            { title: "HTML Tutorial - W3Schools", url: "https://www.w3schools.com/html/" },
            { title: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
        ]
      },
    ]
  },
    {
    id: "CSS",
    title: "CSS",
    description: "Học cách tạo kiểu cho trang web",
    duration: "1-2 tuần",
    skills: ["CSS", "Responsive Design", "Flexbox", "Grid"],
    difficulty: "Intermediate",
    icon: <Laptop className="w-6 h-6" />,
    color: "#8B5CF6",
    subtopics: [
        {  
        title: "CSS Cơ Bản",
        description: "Tìm hiểu về các khái niệm cơ bản của CSS, bao gồm cách sử dụng các thuộc tính CSS để tạo kiểu cho các phần tử HTML.",
        resources: [
            { title: "CSS Tutorial - W3Schools", url: "https://www.w3schools.com/css/" },
            { title: "MDN Web Docs - CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }
        ]
      },
    ]
  },
      {
    id: "Javascript",
    title: "JavaScript",
    description: "Học cách lập trình với JavaScript",
    duration: "2-4 tuần",
    skills: ["JavaScript", "DOM Manipulation", "ES6+", "Asynchronous Programming"],
    difficulty: "Intermediate",
    icon: <Laptop className="w-6 h-6" />,
    color: "#8B5CF6",
    subtopics: [
        {
            title: "JavaScript Cơ Bản",
            description: "Tìm hiểu về các khái niệm cơ bản của JavaScript, bao gồm biến, kiểu dữ liệu, và cấu trúc điều khiển.",
            resources: [
                { title: "JavaScript Tutorial - W3Schools", url: "https://www.w3schools.com/js/" },
                { title: "MDN Web Docs - JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ]
        },
    ]
  },
  {
    id: "version-control",
    title: "Quản Lý Mã Nguồn",
    description: "Học cách quản lý và theo dõi thay đổi trong mã nguồn",
    duration: "1-2 tuần",
    skills: ["Git", "GitHub", "GitLab", "Branching", "Collaboration"],
    difficulty: "Beginner",
    icon: <Code2 className="w-6 h-6" />,
    color: "#F59E0B",
    subtopics: [
      {
        title: "Git Cơ Bản",
        description: "Tìm hiểu về Git và các lệnh cơ bản như commit, push, pull",
        resources: [
          { title: "Git Guide", url: "https://git-scm.com/book/en/v2" },
          { title: "Git Tutorial - W3Schools", url: "https://www.w3schools.com/git/" }
        ]
      },
      {
        title: "Làm Việc Nhóm với Git",
        description: "Học cách sử dụng branch, merge và giải quyết xung đột",
        resources: [
          { title: "Git Branching", url: "https://learngitbranching.js.org/" }
        ]
      },
      {
        title: "Git Flow",
        description: "Quy trình làm việc hiệu quả với Git trong dự án thực tế",
        resources: [
          { title: "Git Flow Guide", url: "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" }
        ]
      }
    ]
  },
  {
    id: "frameworks",
    title: "Frontend Framework",
    description: "Làm chủ các framework frontend phổ biến",
    duration: "8-12 tuần",
    skills: ["React", "Vue", "Angular", "State Management", "Routing"],
    difficulty: "Intermediate",
    icon: <Library className="w-6 h-6" />,
    color: "#EC4899",
    subtopics: [
      {
        title: "React.js",
        description: "Framework phổ biến nhất để xây dựng UI với JavaScript",
        resources: [
          { title: "React Official Docs", url: "https://react.dev/" },
          { title: "React Tutorial", url: "https://react-tutorial.app/" }
        ]
      },
      {
        title: "Next.js",
        description: "Framework React với SSR, routing và nhiều tính năng mạnh mẽ",
        resources: [
          { title: "Next.js Learn", url: "https://nextjs.org/learn" }
        ]
      },
      {
        title: "Quản Lý State",
        description: "Học cách quản lý state với Redux, Context API, Zustand",
        resources: [
          { title: "Redux Tutorial", url: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts" }
        ]
      }
    ]
  },
  {
    id: "testing",
    title: "Kiểm Thử Frontend",
    description: "Học cách viết test cho ứng dụng frontend",
    duration: "3-4 tuần",
    skills: ["Unit Testing", "Integration Testing", "E2E Testing", "Jest", "Cypress"],
    difficulty: "Intermediate",
    icon: <Terminal className="w-6 h-6" />,
    color: "#059669",
    subtopics: [
      {
        title: "Unit Testing với Jest",
        description: "Viết test cho các component và function riêng lẻ",
        resources: [
          { title: "Jest Getting Started", url: "https://jestjs.io/docs/getting-started" }
        ]
      },
      {
        title: "Testing Library",
        description: "Thư viện testing cho React và các framework khác",
        resources: [
          { title: "React Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/" }
        ]
      },
      {
        title: "E2E Testing với Cypress",
        description: "Viết test tự động mô phỏng hành vi người dùng",
        resources: [
          { title: "Cypress Docs", url: "https://docs.cypress.io/" }
        ]
      }
    ]
  },
  {
    id: "performance",
    title: "Tối Ưu Hiệu Năng",
    description: "Học cách tối ưu hiệu năng cho ứng dụng web",
    duration: "3-4 tuần",
    skills: ["Lazy Loading", "Code Splitting", "Caching", "Web Vitals", "SEO"],
    difficulty: "Advanced",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "#6366F1",
    subtopics: [
      {
        title: "Core Web Vitals",
        description: "Hiểu và tối ưu các chỉ số hiệu năng quan trọng",
        resources: [
          { title: "Web Vitals", url: "https://web.dev/vitals/" }
        ]
      },
      {
        title: "Tối Ưu Bundle Size",
        description: "Giảm kích thước bundle với code splitting và lazy loading",
        resources: [
          { title: "Performance Guide", url: "https://web.dev/fast/" }
        ]
      },
      {
        title: "SEO và Accessibility",
        description: "Tối ưu website cho công cụ tìm kiếm và người dùng",
        resources: [
          { title: "SEO Guide", url: "https://web.dev/learn/seo/" },
          { title: "Web Accessibility", url: "https://web.dev/learn/accessibility/" }
        ]
      }
    ]
  }
];

const backendRoadmap: RoadmapNode[] = [
  {
    id: "programming-basics",
    title: "Lập Trình Cơ Bản",
    description: "Nền tảng về lập trình và tư duy giải thuật",
    duration: "4-6 tuần",
    skills: ["Algorithms", "Data Structures", "OOP", "Design Patterns"],
    difficulty: "Beginner",
    icon: <Code2 className="w-6 h-6" />,
    color: "#3B82F6",
    subtopics: [
      {
        title: "Giải Thuật & Cấu Trúc Dữ Liệu",
        description: "Học cách tư duy và giải quyết vấn đề trong lập trình",
        resources: [
          { title: "Data Structures - FreeCodeCamp", url: "https://www.freecodecamp.org/learn/coding-interview-prep/#data-structures" },
          { title: "Algorithms - GeeksForGeeks", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/" }
        ]
      },
      {
        title: "Lập Trình Hướng Đối Tượng",
        description: "Hiểu về class, object, inheritance, polymorphism",
        resources: [
          { title: "OOP Concepts", url: "https://www.w3schools.com/cpp/cpp_oop.asp" }
        ]
      }
    ]
  },
  {
    id: "backend-foundations",
    title: "Nền Tảng Backend",
    description: "Kiến thức cơ bản về phát triển backend",
    duration: "6-8 tuần",
    skills: ["HTTP/HTTPS", "REST API", "Authentication", "Authorization"],
    difficulty: "Intermediate",
    icon: <Server className="w-6 h-6" />,
    color: "#8B5CF6",
    subtopics: [
      {
        title: "API Development",
        description: "Xây dựng REST API với Node.js và Express",
        resources: [
          { title: "REST API Tutorial", url: "https://www.restapitutorial.com/" },
          { title: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html" }
        ]
      },
      {
        title: "Bảo Mật Web",
        description: "Học về authentication, authorization và security best practices",
        resources: [
          { title: "Web Security - OWASP", url: "https://owasp.org/www-project-top-ten/" }
        ]
      }
    ]
  },
  {
    id: "databases",
    title: "Cơ Sở Dữ Liệu",
    description: "Làm việc với các loại database khác nhau",
    duration: "6-8 tuần",
    skills: ["SQL", "NoSQL", "Database Design", "ORMs"],
    difficulty: "Intermediate",
    icon: <Database className="w-6 h-6" />,
    color: "#EC4899",
    subtopics: [
      {
        title: "SQL Databases",
        description: "PostgreSQL, MySQL và database design",
        resources: [
          { title: "SQL Tutorial", url: "https://www.postgresqltutorial.com/" },
          { title: "Database Design", url: "https://www.db-fiddle.com/" }
        ]
      },
      {
        title: "NoSQL Databases",
        description: "MongoDB và các loại NoSQL khác",
        resources: [
          { title: "MongoDB University", url: "https://university.mongodb.com/" }
        ]
      }
    ]
  },
  {
    id: "server-side",
    title: "Server Development",
    description: "Phát triển ứng dụng server-side",
    duration: "8-10 tuần",
    skills: ["Node.js", "Express", "Middleware", "MVC Pattern"],
    difficulty: "Intermediate",
    icon: <Terminal className="w-6 h-6" />,
    color: "#10B981",
    subtopics: [
      {
        title: "Node.js Advanced",
        description: "Event loop, streams, buffers và performance",
        resources: [
          { title: "Node.js Docs", url: "https://nodejs.org/en/docs/" }
        ]
      },
      {
        title: "Middleware & Error Handling",
        description: "Xử lý request/response pipeline và errors",
        resources: [
          { title: "Express Middleware", url: "https://expressjs.com/en/guide/using-middleware.html" }
        ]
      }
    ]
  },
  {
    id: "advanced-backend",
    title: "Backend Nâng Cao",
    description: "Kiến trúc và công nghệ backend nâng cao",
    duration: "10-12 tuần",
    skills: ["Microservices", "Docker", "CI/CD", "Cloud Services"],
    difficulty: "Advanced",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "#6366F1",
    subtopics: [
      {
        title: "Microservices Architecture",
        description: "Thiết kế và triển khai microservices",
        resources: [
          { title: "Microservices.io", url: "https://microservices.io/" }
        ]
      },
      {
        title: "Containerization",
        description: "Docker và container orchestration",
        resources: [
          { title: "Docker Tutorial", url: "https://docs.docker.com/get-started/" }
        ]
      },
      {
        title: "Cloud Services",
        description: "AWS, Google Cloud, Azure fundamentals",
        resources: [
          { title: "AWS Training", url: "https://aws.amazon.com/training/" }
        ]
      }
    ]
  },
  {
    id: "testing-monitoring",
    title: "Testing & Monitoring",
    description: "Kiểm thử và giám sát ứng dụng",
    duration: "4-6 tuần",
    skills: ["Unit Testing", "Integration Testing", "Logging", "Monitoring"],
    difficulty: "Advanced",
    icon: <Terminal className="w-6 h-6" />,
    color: "#F59E0B",
    subtopics: [
      {
        title: "Testing Strategy",
        description: "Unit tests, integration tests, và test automation",
        resources: [
          { title: "Jest Docs", url: "https://jestjs.io/docs/getting-started" }
        ]
      },
      {
        title: "Monitoring & Logging",
        description: "Application monitoring, logging, và error tracking",
        resources: [
          { title: "ELK Stack", url: "https://www.elastic.co/what-is/elk-stack" }
        ]
      }
    ]
  }
];

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend');
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentRoadmap = activeTab === 'frontend' ? frontendRoadmap : backendRoadmap;

  return (
    <div className="min-h-screen w-full text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Roadmap Web Development
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Theo dõi lộ trình có cấu trúc của chúng tôi để trở thành lập trình viên web full-stack. Mỗi bước đều xây dựng trên những kiến thức trước đó.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'frontend'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Laptop className="w-5 h-5" />
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'backend'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Server className="w-5 h-5" />
              Backend
            </button>
          </div>
        </div>

        {/* Roadmap Nodes */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-6xl mx-auto" 
          ref={containerRef}
        >
          {/* Connection Lines - Hidden on mobile, visible on larger screens */}
          <div className="hidden sm:block absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 transform -translate-x-1/2" />

          {/* Mobile Connection Line */}
          <div className="sm:hidden absolute left-4 top-0 w-px h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20" />

          {/* Nodes */}
          <div className="relative space-y-16 sm:space-y-32">
            {currentRoadmap.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col sm:flex-row ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } items-start sm:items-center gap-6 sm:gap-8`}
              >
                {/* Node Content */}
                <div className="w-full sm:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    {/* Existing node header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${node.color}20` }}
                      >
                        {node.icon}
                      </div>
                      <h3 className="text-xl font-bold">{node.title}</h3>
                    </div>

                    <p className="text-gray-400 mb-4">{node.description}</p>

                    {/* Skills section */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {node.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* New Subtopics Section */}
                    <div className="mt-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-300">Nội dung chính:</h4>
                      <div className="space-y-3">
                        {node.subtopics && node.subtopics.map((subtopic, idx) => (
                          <motion.div
                            key={subtopic.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/30"
                          >
                            <h5 className="font-medium text-gray-200 mb-1">
                              {subtopic.title}
                            </h5>
                            <p className="text-sm text-gray-400">
                              {subtopic.description}
                            </p>
                            {subtopic.resources && (
                              <div className="mt-2 flex gap-2">
                                {subtopic.resources.map(resource => (
                                  <a
                                    key={resource.url}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full hover:bg-blue-500/20 transition-colors"
                                  >
                                    {resource.title} →
                                  </a>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Existing duration and difficulty section */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-6">
                      <span>{node.duration}</span>
                      <span className="px-2 py-1 rounded-full bg-gray-700/50">
                        {node.difficulty}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Connection Node */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 top-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tab Info */}
        <motion.div
          key={`${activeTab}-info`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16 p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              {activeTab === 'frontend' ? 'Frontend Development Path' : 'Backend Development Path'}
            </h3>
            <p className="text-gray-400">
              {activeTab === 'frontend' 
                ? 'Tập trung vào giao diện người dùng, trải nghiệm người dùng và các framework hiện đại để xây dựng ứng dụng web tương tác.'
                : 'Tập trung vào logic phía máy chủ, cơ sở dữ liệu và API để xây dựng backend mạnh mẽ cho ứng dụng web.'
              }
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                <span className="text-blue-400 text-sm">
                  {currentRoadmap.length} giai đoạn
                </span>
              </div>
              <div className="px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
                <span className="text-purple-400 text-sm">
                  {currentRoadmap.reduce((total, node) => {
                    const weeks = parseInt(node.duration.split('-')[1]);
                    return total + weeks;
                  }, 0)} tuần tối đa
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}