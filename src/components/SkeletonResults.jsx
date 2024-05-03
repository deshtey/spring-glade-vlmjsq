import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonResults = () => {
  return (
    <>
      {Array(100)
        .fill()
        .map((item, index) => (
          <div key={index}>
            <Skeleton className="pt-[100%] h-0 relative" />
          </div>
        ))}
    </>
  );
};

export default SkeletonResults;
