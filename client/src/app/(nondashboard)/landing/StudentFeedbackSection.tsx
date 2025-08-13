import React from "react";
import Image from "next/image";

const StudentFeedbackSection = () => {
  return (
    <div>
      <br />
      <br />
      <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 md:!text-5xl !text-3xl">
        Học Viên <span className="text-gradient">Đánh Giá</span>
      </h1>
      <p className="text-[16px] font-Poppins relative text-center py-5">
        <span className="dot"></span> Cùng xem những đánh giá từ học viên nhé
      </p>
      <br />
      <div
        className="max-w-[95%] mx-auto p-4 md:block columns-auto md:columns-3"
        style={{ columnGap: "1rem" }}
      >
        {/* REVIEW 1 */}
        <div className="break-inside-avoid mb-5">
          <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
            <div className="flex w-full">
              <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                <div className="w-[55px]">
                  <span
                    tabIndex={-1}
                    className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                  >
                    <Image
                      src="/avatar.png"
                      alt="Nguyễn Quang Hùng Avatar"
                      width={56}
                      height={56}
                      className="flex object-cover w-full h-full"
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full">
                  <div className="pl-4">
                    <h5 className="md:text-[20px] mb-2">Nguyễn Quang Hùng</h5>
                    <h6 className="text-[14px] text-[#ffffffab]">
                      Web developer
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Cảm ơn bạn vì kênh hướng dẫn lập trình rất bổ ích! Khả năng chia
              nhỏ các chủ đề phức tạp thành những phần dễ hiểu của bạn, cùng với
              việc bao quát nhiều ngôn ngữ lập trình và chủ đề khác nhau, thật
              sự rất ấn tượng. Những ví dụ thực tế và ứng dụng thực tiễn mà bạn
              lồng ghép vào giúp củng cố kiến thức lý thuyết và mang lại nhiều
              góc nhìn giá trị!
            </p>
          </div>
        </div>

        {/* REVIEW 2 */}
        <div className="break-inside-avoid mb-5">
          <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
            <div className="flex w-full">
              <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                <div className="w-[55px]">
                  <span
                    tabIndex={-1}
                    className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                  >
                    <Image
                      src="/avatar.png"
                      alt="Trần Minh Avatar"
                      width={56}
                      height={56}
                      className="flex object-cover w-full h-full"
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full">
                  <div className="pl-4">
                    <h5 className="md:text-[20px] mb-2">Trần Minh</h5>
                    <h6 className="text-[14px] text-[#ffffffab]">
                      Junior Web Developer
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Nội dung của bạn thật sự rất đặc biệt. Điều mà mình thích nhất
              chính là các video đều có thời lượng dài, giúp bạn trình bày mọi
              thứ một cách chi tiết. Nhờ vậy, ngay cả những người ở mức độ mới
              bắt đầu cũng có thể hoàn thành một dự án hoàn chỉnh sau khi xem
              xong. Cảm ơn bạn rất nhiều! Mình rất háo hức chờ đợi những video
              tiếp theo. Hãy tiếp tục công việc tuyệt vời này nhé!
            </p>
          </div>
        </div>

        {/* REVIEW 3 */}
        <div className="break-inside-avoid mb-5">
          <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
            <div className="flex w-full">
              <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                <div className="w-[55px]">
                  <span
                    tabIndex={-1}
                    className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                  >
                    <Image
                      src="/avatar.png"
                      alt="Joseph Le Avatar"
                      width={56}
                      height={56}
                      className="flex object-cover w-full h-full"
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full">
                  <div className="pl-4">
                    <h5 className="md:text-[20px] mb-2">Joseph Le</h5>
                    <h6 className="text-[14px] text-[#ffffffab]">
                      Full stack web developer
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Tham gia ngay CodeWithSamuel! CodeWithSamuel tập trung vào các ứng
              dụng thực tiễn thay vì chỉ giảng dạy lý thuyết về các ngôn ngữ lập
              trình hay framework. Mình đã học một bài hướng dẫn về cách tạo một
              sàn thương mại điện tử bằng React JS, và nó thực sự hữu ích trong
              việc giúp mình hiểu các giai đoạn khác nhau của việc hoàn thành
              một dự án từ đầu đến cuối. Tổng thể, mình rất khuyến khích
              CodeWithSamuel cho bất kỳ ai muốn cải thiện kỹ năng lập trình và
              xây dựng các dự án thực tế. CodeWithSamuel thực sự là một nguồn
              tài nguyên tuyệt vời để giúp bạn nâng tầm kỹ năng của mình!
            </p>
          </div>
        </div>

        {/* REVIEW 4 */}
        <div className="break-inside-avoid mb-5">
          <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
            <div className="flex w-full">
              <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                <div className="w-[55px]">
                  <span
                    tabIndex={-1}
                    className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                  >
                    <Image
                      src="/avatar.png"
                      alt="Danh Meta Avatar"
                      width={56}
                      height={56}
                      className="flex object-cover w-full h-full"
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full">
                  <div className="pl-4">
                    <h5 className="md:text-[20px] mb-2">Danh Meta</h5>
                    <h6 className="text-[14px] text-[#ffffffab]">
                      Full stack web developer
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Samuel thực sự là một lập trình viên tốt. Anh ấy có khả năng tuyệt
              vời trong việc giải quyết các lỗi trên website, và kỹ năng xử lý
              vấn đề của anh ấy thì không chê vào đâu được. Hơn thế nữa, nội
              dung trên kênh Tiktok và Youtube của anh ấy luôn đạt chất lượng
              hàng đầu. Mình rất khuyến khích mọi người ủng hộ cộng đồng
              CodeWithSamuel!
            </p>
          </div>
        </div>

        {/* REVIEW 5 */}
        <div className="break-inside-avoid mb-5">
          <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
            <div className="flex w-full">
              <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                <div className="w-[55px]">
                  <span
                    tabIndex={-1}
                    className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                  >
                    <Image
                      src="/avatar.png"
                      alt="Đặng Phùng Danh Avatar"
                      width={56}
                      height={56}
                      className="flex object-cover w-full h-full"
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full">
                  <div className="pl-4">
                    <h5 className="md:text-[20px] mb-2">Đặng Phùng Danh</h5>
                    <h6 className="text-[14px] text-[#ffffffab]">
                      Founder & CEO
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Mình rất trân trọng sự tận tâm, chuyên môn và nhiệt huyết của bạn
              trong việc giảng dạy lập trình. CodeWithSamuel không chỉ dừng lại
              ở việc dạy lý thuyết về ngôn ngữ lập trình và framework. Trang web
              còn cung cấp rất nhiều khóa học liên quan đến công nghệ, nhưng
              khóa học mà mình chọn thực sự khiến mình ấn tượng về chi phí và
              chất lượng. Với danh sách khóa học phong phú và đội ngũ giảng viên
              xuất sắc, CodeWithSamuel chính là nơi lý tưởng để bạn mở rộng kiến
              thức và kỹ năng trong ngành công nghệ.
            </p>
          </div>
        </div>

        {/* REVIEW 6 */}
        <div className="break-inside-avoid mb-5">
          <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
            <div className="flex w-full">
              <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                <div className="w-[55px]">
                  <span
                    tabIndex={-1}
                    className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                  >
                    <Image
                      src="/avatar.png"
                      alt="Trần Long IT Avatar"
                      width={56}
                      height={56}
                      className="flex object-cover w-full h-full"
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full">
                  <div className="pl-4">
                    <h5 className="md:text-[20px] mb-2">Trần Long IT</h5>
                    <h6 className="text-[14px] text-[#ffffffab]">
                      Computer systems engineering student
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              CodeWithSamuel làm rất tốt trong việc giải thích các khái niệm một
              cách rõ ràng và súc tích, cùng với những ví dụ được chọn lọc kỹ
              lưỡng. Nhìn chung, đây là một nguồn tài liệu quý giá cho bất kỳ ai
              mới bắt đầu học lập trình.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedbackSection;
