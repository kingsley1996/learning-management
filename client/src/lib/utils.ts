import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";
import { api } from "../state/api";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Định dạng giá tiền từ số VND sang định dạng chuẩn VND "₫X.XXX.XXX"
export function formatPrice(vnd: number | undefined): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Không hiển thị số thập phân với VND
    maximumFractionDigits: 0
  }).format(vnd || 0);
}

// Chuyển đổi từ chuỗi VND (có thể chứa dấu phẩy, dấu chấm phân cách) thành số
export function parseVndString(vnd: string | number): number {
  if (typeof vnd === 'number') return vnd;
  
  // Loại bỏ dấu chấm, thay dấu phẩy thành dấu chấm và chuyển thành số
  return parseFloat(vnd.replace(/\./g, '').replace(',', '.'));
}

// Hàm hỗ trợ để giữ lại tương thích với code hiện tại
export function centsToVnd(value: number | undefined): string {
  // Đơn giản trả về giá trị nguyên - không còn cần chuyển đổi
  return (value || 0).toString();
}

// Zod schema for price input (just parses VND as number)
export const priceSchema = z.string().transform((val) => {
  // Chuyển đổi chuỗi giá tiền thành số
  const vndAmount = parseVndString(val);
  if (isNaN(vndAmount)) return "0";
  return vndAmount.toString();
});

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const customStyles = "text-gray-300 placeholder:text-gray-500";

export function convertToSubCurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export const NAVBAR_HEIGHT = 48;

export const courseCategories = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
] as const;

export const customDataGridStyles = {
  border: "none",
  backgroundColor: "#17181D",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#1B1C22",
    color: "#6e6e6e",
    "& [role='row'] > *": {
      backgroundColor: "#1B1C22 !important",
      border: "none !important",
    },
  },
  "& .MuiDataGrid-cell": {
    color: "#6e6e6e",
    border: "none !important",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#17181D",
    "&:hover": {
      backgroundColor: "#25262F",
    },
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#17181D",
    color: "#6e6e6e",
    border: "none !important",
  },
  "& .MuiDataGrid-filler": {
    border: "none !important",
    backgroundColor: "#17181D !important",
    borderTop: "none !important",
    "& div": {
      borderTop: "none !important",
    },
  },
  "& .MuiTablePagination-root": {
    color: "#6e6e6e",
  },
  "& .MuiTablePagination-actions .MuiIconButton-root": {
    color: "#6e6e6e",
  },
};

export const createCourseFormData = (
  data: CourseFormData,
  image: any,
  sections: Section[]
): FormData => {
  const formData = new FormData();
  formData.append("isFreeCourse", data.isFreeCourse.toString());
  formData.append("image", image);
  formData.append("title", data.courseTitle);
  formData.append("description", data.courseDescription);
  formData.append("category", data.courseCategory);
  formData.append("price", data.coursePrice.toString());
  formData.append("status", data.courseStatus ? "Published" : "Draft");

  const sectionsWithVideos = sections.map((section) => ({
    ...section,
    chapters: section.chapters.map((chapter) => ({
      ...chapter,
      video: chapter.video,
    })),
  }));

  formData.append("sections", JSON.stringify(sectionsWithVideos));

  return formData;
};

export const uploadAllVideos = async (
  localSections: Section[],
  courseId: string,
  getUploadVideoUrl: any
) => {
  const updatedSections = localSections.map((section) => ({
    ...section,
    chapters: section.chapters.map((chapter) => ({
      ...chapter,
    })),
  }));

  for (let i = 0; i < updatedSections.length; i++) {
    for (let j = 0; j < updatedSections[i].chapters.length; j++) {
      const chapter = updatedSections[i].chapters[j];
      if (chapter.video instanceof File && chapter.video.type === "video/mp4") {
        try {
          const updatedChapter = await uploadVideo(
            chapter,
            courseId,
            updatedSections[i].sectionId,
            getUploadVideoUrl
          );
          updatedSections[i].chapters[j] = updatedChapter;
        } catch (error) {
          console.error(
            `Failed to upload video for chapter ${chapter.chapterId}:`,
            error
          );
        }
      }
    }
  }

  return updatedSections;
};

async function uploadVideo(
  chapter: Chapter,
  courseId: string,
  sectionId: string,
  getUploadVideoUrl: any
) {
  const file = chapter.video as File;

  try {
    const { uploadUrl, videoUrl } = await getUploadVideoUrl({
      courseId,
      sectionId,
      chapterId: chapter.chapterId,
      fileName: file.name,
      fileType: file.type,
    }).unwrap();

    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    toast.success(
      `Video uploaded successfully for chapter ${chapter.chapterId}`
    );

    return { ...chapter, video: videoUrl };
  } catch (error) {
    console.error(
      `Failed to upload video for chapter ${chapter.chapterId}:`,
      error
    );
    throw error;
  }
}

export async function uploadImage(
  courseId: string,
  file: any,
  getUploadImageUrl: any
) {
  try {
    const { uploadUrl, imageUrl } = await getUploadImageUrl({
      courseId,
      fileName: file.name,
      fileType: file.type,
    }).unwrap();

    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    toast.success(`Image uploaded successfully for course - ${courseId}`);

    return imageUrl;
  } catch (error) {
    console.error(`Failed to upload image for course - ${courseId}:`, error);
    throw error;
  }
}

// Blog Image Upload Functions
export const createBlogFormData = (
  data: any,
  image: string | null
): FormData => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("slug", data.slug);
  formData.append("excerpt", data.excerpt || "");
  formData.append("coverImageUrl", image || "");
  formData.append("tags", JSON.stringify(data.tags));
  formData.append("content", data.content);
  formData.append("published", data.published.toString());
  formData.append("authorId", data.authorId);
  formData.append("authorName", data.authorName);

  return formData;
};

export async function uploadBlogImage(
  postId: string,
  file: File,
  getUploadImageUrl: any
): Promise<string> {
  try {
    const { uploadUrl, imageUrl } = await getUploadImageUrl({
      postId,
      fileName: file.name,
      fileType: file.type,
    }).unwrap();

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    toast.success(`Ảnh đã được tải lên thành công`);
    return imageUrl;
  } catch (error) {
    console.error(`Failed to upload image for blog post ${postId}:`, error);
    toast.error("Upload ảnh thất bại");
    throw error;
  }
}

// Validate image file
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Chỉ hỗ trợ file JPG, PNG, WebP, GIF'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Kích thước file không được vượt quá 5MB'
    };
  }

  return { isValid: true };
};

// Generate unique filename for blog images
export const generateBlogImageFileName = (originalName: string, postId?: string): string => {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  return postId 
    ? `blog-${postId}-${timestamp}.${extension}`
    : `blog-${timestamp}-${cleanName}`;
};

// Blog categories
export const blogCategories = [
  { value: "technology", label: "Công Nghệ" },
  { value: "programming", label: "Lập Trình" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "artificial-intelligence", label: "Trí Tuệ Nhân Tạo" },
  { value: "data-science", label: "Khoa Học Dữ Liệu" },
  { value: "tutorial", label: "Hướng Dẫn" },
  { value: "tips-tricks", label: "Tips & Tricks" },
  { value: "career", label: "Nghề Nghiệp" },
  { value: "review", label: "Review" },
] as const;

// Safe date formatter
export function formatDate(date: string | Date | undefined | null): string {
  if (!date) return "Chưa xác định";
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "Ngày không hợp lệ";
    
    return dateObj.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (error) {
    return "Ngày không hợp lệ";
  }
}

export function formatDateShort(date: string | Date | undefined | null): string {
  if (!date) return "Chưa xác định";
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "N/A";
    
    return dateObj.toLocaleDateString('vi-VN');
  } catch (error) {
    return "N/A";
  }
}
