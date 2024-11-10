"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, useEffect, useState } from "react";
import TableThree from "@/components/Tables/TableThree";

export default function AllSubUsers() {
    const [allSubUsers, setAllSubUsers] = useState([]);

    useEffect(() => {
      const fetchSubUsers = async () => {
        try {
          const response = await fetch("/api/user/all-subusers");
          if (response.ok) {
            const data = await response.json();
            setAllSubUsers(data);
          } else {
            console.error("Failed to fetch sub-users:", response.statusText);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
  
      fetchSubUsers();
    }, []);
 
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <Breadcrumb pageName="All Sub Users" />
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <TableThree data={ allSubUsers}/>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
