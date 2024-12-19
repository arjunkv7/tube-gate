"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, useEffect, useState } from "react"; 
import AllUploadRequestTable from "@/components/Tables/AllUploadRequestsTable";

export default function AllUploadRequests() {
    const [approvedRequests, setApprovedRequests] = useState([]);

    useEffect(() => {
      const fetchPendingRequests = async () => {
        try {
          const response = await fetch("/api/workflow/all-upload-request");
          if (response.ok) {
            const data = await response.json();
            setApprovedRequests(data.data);
          } else {
            console.error("Failed to fetch sub-users:", response.statusText);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
  
      fetchPendingRequests();
    }, []);
 
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <Breadcrumb pageName="All Approved Requests" />
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <AllUploadRequestTable data={ approvedRequests}/>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
