import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CourseCardSearch = ({
  course,
  isSelected,
  userId,
  onClick,
}: SearchCourseCardProps) => {
  // Kiểm tra nếu userId có trong danh sách enrollments
  const hasEnrolled = userId
    ? course.enrollments?.some((enrollment) => enrollment.userId === userId)
    : false;

  return (
    <div
      onClick={onClick}
      className={`relative course-card-search group ${
        isSelected
          ? "course-card-search--selected"
          : "course-card-search--unselected"
      }`}
    >
      {/* Badge "Đã tham gia" */}
      {hasEnrolled && (
        <div className="absolute top-2 right-2 bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md z-10">
          Đã tham gia
        </div>
      )}
      <div className="course-card-search__image-container">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="course-card-search__image"
          priority
        />
      </div>
      <div className="course-card-search__content">
        <div>
          <h2 className="course-card-search__title">{course.title}</h2>
          <p className="course-card-search__description">
            {course.description}
          </p>
        </div>
        <div className="mt-2">
          <p className="course-card-search__teacher">By {course.teacherName}</p>
          <div className="course-card-search__footer">
            <span className="course-card-search__price">
              {course.isFreeCourse ? "Miễn phí" : formatPrice(course.price)}
            </span>
            <span className="course-card-search__enrollment">
              {course.enrollments?.length} đã tham gia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSearch;
