import AccordionSections from "@/components/AccordionSections";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const SelectedCourse = ({
  userId,
  course,
  handleEnrollNow,
}: SelectedCourseProps) => {
  // Kiểm tra nếu userId có trong danh sách enrollments
  const hasEnrolled = userId
    ? course.enrollments?.some((enrollment) => enrollment.userId === userId)
    : false;
  const router = useRouter();

  const handleGoToCourse = (course: Course) => {
    if (
      course.sections &&
      course.sections.length > 0 &&
      course.sections[0].chapters.length > 0
    ) {
      const firstChapter = course.sections[0].chapters[0];
      router.push(
        `/user/courses/${course.courseId}/chapters/${firstChapter.chapterId}`,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`/user/courses/${course.courseId}`, {
        scroll: false,
      });
    }
  };
  return (
    <div className="selected-course">
      <div>
        <h3 className="selected-course__title">{course.title}</h3>
        <p className="selected-course__author">
          By {course.teacherName} |{" "}
          <span className="selected-course__enrollment-count">
            {course?.enrollments?.length}
          </span>
        </p>
      </div>

      <div className="selected-course__content">
        <p className="selected-course__description">{course.description}</p>

        <div className="selected-course__sections">
          <h4 className="selected-course__sections-title">Nội dung khoá học</h4>
          <AccordionSections sections={course.sections} />
        </div>
        {!hasEnrolled ? (
          <div className="selected-course__footer">
            <span className="selected-course__price">
              {formatPrice(course.price)}
            </span>
            <Button
              onClick={() => handleEnrollNow(course.courseId)}
              className="bg-primary-700 hover:bg-primary-600"
            >
              Tham Gia
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleGoToCourse(course)}
            className="mt-5 bg-primary-700 hover:bg-primary-600"
          >
            Tiếp tục học
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelectedCourse;
