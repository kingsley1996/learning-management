import React from "react";
import Image from "next/image";

const TrustedSection = () => {
  return (
    <div className="mb-10">
      <br />
      <br />
      <h5 className="text-[25px] font-[500] font-Poppins text-center py-2 !text-3xl md:!text-5xl capitalize mb-[-3%]">
        <span className="text-gradient">CodeWithSamuel</span> trusted by
      </h5>
      <div className="w-[80%] sm:w-[70%] m-auto block">
        <div className="rfm-marquee-container w-full flex">
          <div className="rfm-marquee">
            <div className="rfm-initial-child-container">
              <div className="rfm-child">
                <Image
                  src="/brand/clerk-logo.svg"
                  alt="Clerk Logo"
                  width={220}
                  height={220}
                  className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                />
              </div>
              <div className="rfm-child">
                <Image
                  src="/brand/upstash-logo.svg"
                  alt="Upstash Logo"
                  width={220}
                  height={220}
                  className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                />
              </div>
              <div className="rfm-child">
                <Image
                  src="/brand/one-entry.svg"
                  alt="One Entry Logo"
                  width={220}
                  height={220}
                  className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </div>
          <div className="rfm-marquee">
            <div className="rfm-initial-child-container">
              <div className="rfm-child">
                <Image
                  src="/brand/clerk-logo.svg"
                  alt="Clerk Logo"
                  width={220}
                  height={220}
                  className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                />
              </div>
              <div className="rfm-child">
                <Image
                  src="/brand/upstash-logo.svg"
                  alt="Upstash Logo"
                  width={220}
                  height={220}
                  className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                />
              </div>
              <div className="rfm-child">
                <Image
                  src="/brand/one-entry.svg"
                  alt="One Entry Logo"
                  width={220}
                  height={220}
                  className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedSection;
