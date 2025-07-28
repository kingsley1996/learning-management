"use client";

import { CustomFormField } from "@/components/CustomFormField";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { courseSchema } from "@/lib/schemas";
import {
  createCourseFormData,
  uploadAllVideos,
  uploadImage,
} from "@/lib/utils";
import { openSectionModal, setSections } from "@/state";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetUploadVideoUrlMutation,
  useGetUploadImageUrlMutation,
} from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DroppableComponent from "./Droppable";
import ChapterModal from "./ChapterModal";
import SectionModal from "./SectionModal";
import Image from "next/image";

const CourseEditor = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: course, isLoading, refetch } = useGetCourseQuery(id);
  const [updateCourse] = useUpdateCourseMutation();
  const [getUploadVideoUrl] = useGetUploadVideoUrlMutation();
  const [getUploadImageUrl] = useGetUploadImageUrlMutation();

  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      isFreeCourse: true,
      image: "",
      courseTitle: "",
      courseDescription: "",
      courseCategory: "",
      coursePrice: "0",
      courseStatus: false,
    },
  });

  useEffect(() => {
    if (course) {
      methods.reset({
        image: course.image,
        isFreeCourse: course.isFreeCourse,
        courseTitle: course.title,
        courseDescription: course.description,
        courseCategory: course.category,
        coursePrice: course.price?.toString() || "0",
        courseStatus: course.status === "Published",
      });
      dispatch(setSections(course.sections || []));
    }
  }, [course, methods]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: CourseFormData) => {
    try {
      const updatedSections = await uploadAllVideos(
        sections,
        id,
        getUploadVideoUrl
      );
      let image = course?.image;
      const imageFile = methods.watch("image");
      if (imageFile instanceof File) {
        image = await uploadImage(id, imageFile, getUploadImageUrl);
      }

      const formData = createCourseFormData(data, image, updatedSections);

      await updateCourse({
        courseId: id,
        formData,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-customgreys-dirtyGrey rounded-lg p-2 gap-2 cursor-pointer hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey"
          onClick={() => router.push("/teacher/courses", { scroll: false })}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở lại</span>
        </button>
      </div>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header
            title="Thiết lập khóa học"
            subtitle="Hoàn thành tất cả các trường và lưu khóa học của bạn"
            rightElement={
              <div className="flex items-center space-x-4">
                <CustomFormField
                  name="courseStatus"
                  label={
                    methods.watch("courseStatus") ? "Công khai" : "Bản nháp"
                  }
                  type="switch"
                  className="flex items-center space-x-2"
                  labelClassName={`text-sm font-medium ${
                    methods.watch("courseStatus")
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                  inputClassName="data-[state=checked]:bg-green-500"
                />
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-600"
                >
                  {methods.watch("courseStatus")
                    ? "Cập nhật khoá học"
                    : "Lưu bản nháp"}
                </Button>
              </div>
            }
          />

          <div className="flex justify-between md:flex-row flex-col gap-10 mt-5">
            <div className="basis-1/2">
              <div className="space-y-4">
                <CustomFormField
                  name="isFreeCourse"
                  label={methods.watch("isFreeCourse") ? "Miễn phí" : "Thu phí"}
                  type="switch"
                  className="flex items-center space-x-2"
                  labelClassName={`text-sm font-medium ${
                    methods.watch("isFreeCourse")
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                  inputClassName="data-[state=checked]:bg-green-500"
                />
                <FormField
                  control={methods.control}
                  name="image"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel className="text-customgreys-dirtyGrey text-sm">
                        Ảnh đại diện
                      </FormLabel>
                      {course?.image && (
                        <div>
                          <Image
                            src={course?.image}
                            width={150}
                            height={50}
                            alt="Course Image"
                          />
                        </div>
                      )}
                      <FormControl>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("file: ", file);
                                // methods.setValue("image", file);
                                onChange(file);
                              }
                            }}
                            className="border-none bg-customgreys-darkGrey py-2 cursor-pointer"
                          />
                          {typeof value === "string" && value && (
                            <div className="my-2 text-sm text-gray-600">
                              Current video: {value.split("/").pop()}
                            </div>
                          )}
                          {value instanceof File && (
                            <div className="my-2 text-sm text-gray-600">
                              Selected file: {value.name}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <CustomFormField
                  name="courseTitle"
                  label="Tiêu đề"
                  type="text"
                  placeholder="Viết tiêu đề ở đây"
                  className="border-none"
                  initialValue={course?.title}
                />

                <CustomFormField
                  name="courseDescription"
                  label="Mô tả"
                  type="textarea"
                  placeholder="Viết mô tả ở đây"
                  initialValue={course?.description}
                />

                <CustomFormField
                  name="courseCategory"
                  label="Chọn danh mục"
                  type="select"
                  placeholder="Chọn danh mục ở đây"
                  options={[
                    { value: "technology", label: "Công Nghệ - IT" },
                    { value: "science", label: "Khoa Học" },
                    { value: "mathematics", label: "Toán Học" },
                    {
                      value: "Artificial Intelligence",
                      label: "AI",
                    },
                  ]}
                  initialValue={course?.category}
                />

                <CustomFormField
                  name="coursePrice"
                  disabled={methods.watch("isFreeCourse")}
                  label="Giá"
                  type="number"
                  placeholder="0"
                  initialValue={course?.price}
                />
              </div>
            </div>

            <div className="bg-customgreys-darkGrey mt-4 md:mt-0 p-4 rounded-lg basis-1/2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-secondary-foreground">
                  Danh mục
                </h2>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    dispatch(openSectionModal({ sectionIndex: null }))
                  }
                  className="border-none text-primary-700 group"
                >
                  <Plus className="mr-1 h-4 w-4 text-primary-700 group-hover:white-100" />
                  <span className="text-primary-700 group-hover:white-100">
                    Thêm
                  </span>
                </Button>
              </div>

              {isLoading ? (
                <p>Đang tải nội dung khoá học...</p>
              ) : sections.length > 0 ? (
                <DroppableComponent />
              ) : (
                <p>Không có danh mục nào</p>
              )}
            </div>
          </div>
        </form>
      </Form>

      <ChapterModal />
      <SectionModal />
    </div>
  );
};

export default CourseEditor;
