"use client";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";

const Dashboard: React.FC = () => {
  const[numbers, setNumbers] = useState({
    totalUploads: 0,
    uploadRequests: 0,
    pendingReviews: 0,
    approvedUploads: 0,
  });

  useEffect(() => {
    async function fetchCount() {
      let response = await fetch("/api/user/dashboard-counts");
      let data = await response.json();
      setNumbers(data);
    }
    fetchCount()
  }, [])

  return (
    <div className="p-6 bg-gray-100 dark:bg-graydark min-h-screen">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your dashboard! Here are your latest metrics.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Uploads"
          total={numbers?.totalUploads.toString()}
          // rate="5.25%"
          // levelUp
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.924 0 0 4.924 0 11C0 17.076 4.924 22 11 22C17.076 22 22 17.076 22 11C22 4.924 17.076 0 11 0ZM11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2C15.97 2 20 6.03 20 11C20 15.97 15.97 20 11 20Z"
            />
            <path
              d="M16 11H12V16H10V11H6L11 6L16 11Z"
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Upload Requests"
          total={numbers?.uploadRequests.toString()}
          
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.924 0 0 4.924 0 11C0 17.076 4.924 22 11 22C17.076 22 22 17.076 22 11C22 4.924 17.076 0 11 0ZM11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2C15.97 2 20 6.03 20 11C20 15.97 15.97 20 11 20Z"
            />
            <path
              d="M11 6L6 11H10V16H12V11H16L11 6Z"
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Pending Reviews"
          total={numbers?.pendingReviews.toString()}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.924 0 0 4.924 0 11C0 17.076 4.924 22 11 22C17.076 22 22 17.076 22 11C22 4.924 17.076 0 11 0ZM11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2C15.97 2 20 6.03 20 11C20 15.97 15.97 20 11 20Z"
            />
            <path
              d="M11 4V12H15V14H7V12H11V4Z"
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Approved Uploads"
          total={numbers?.approvedUploads.toString()}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.924 0 0 4.924 0 11C0 17.076 4.924 22 11 22C17.076 22 22 17.076 22 11C22 4.924 17.076 0 11 0ZM11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2C15.97 2 20 6.03 20 11C20 15.97 15.97 20 11 20Z"
            />
            <path
              d="M16.5 6.5L9.5 13.5L5.5 9.5L6.5 8.5L9.5 11.5L15.5 5.5L16.5 6.5Z"
            />
          </svg>
        </CardDataStats>
      </div>

      {/* Additional Section */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Latest Activities
        </h2>
        <div className="mt-4 p-4 bg-white rounded shadow-lg dark:bg-boxdark">
          <p className="text-gray-600 dark:text-gray-400">
            You can add a list or summary of recent activities or other metrics here.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
