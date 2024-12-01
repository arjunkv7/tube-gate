"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, useEffect, useState } from "react";
import TableThree from "@/components/Tables/TableThree";
import WorkflowTable from "@/components/Tables/WorkflowTable";

const mockData = [
    {
      title: "Video Title 1",
      description: "This is a description of video 1",
      filePath: "path/to/video1.mp4",
      youtubeVideoId: "Wtq3RRORVx4",
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: "tag1, tag2",
      privacy: "private",
      category: "education",
      license: "standard",
      subUserName: "Sub User 1",
      status: "pending",
    },
    {
      title: "Video Title 2",
      description: "This is a description of video 2",
      filePath: "path/to/video2.mp4",
      youtubeVideoId: "6gcGb3qwDBc",
      accessToken: "ya29.a0AeDClZA4lcvX3VMdc3noTvbOhhoCxVxh0KPnivZQut01iq9S8VSTegtmIAHfxgRnA5mXco7kWDq7-V9SWwLWCY77sONIA5f8tS3YkKYuGd20psfdSMZp4EDMkFHM_r6kfSANnSpyPaL91UeEYQxOs7TqAxKKQRxzpIDeIhdM_QaCgYKAd4SARMSFQHGX2MizER6CfP-ifAUyxqs0DzaRw0177",
      idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2MjgyNTg2MDExMTNlNjU3NmE0NTMzNzM2NWZlOGI4OTczZDE2NzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0Nzg1NTQzNjMwNTYtMG9na2E0Z2FyNnE3OXUydTU4MmxjcWdxbDJ0MDZmajguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0Nzg1NTQzNjMwNTYtMG9na2E0Z2FyNnE3OXUydTU4MmxjcWdxbDJ0MDZmajguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM4NDk0MTc2NTA3NjkyNTc3MjAiLCJlbWFpbCI6ImFyanVua3Zhcmp1N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkIwWjN2cXRBVkhmMjM1bkwzM3BjUWciLCJuYW1lIjoiQXJqdW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXZycGdzdEUwOFFIUFpOUzBldkpEa1ZZUFRwUUF5bEh4eURpOVpiQzVGdVNjQURwYkh0QT1zOTYtYyIsImdpdmVuX25hbWUiOiJBcmp1biIsImlhdCI6MTczMzAzOTMxOCwiZXhwIjoxNzMzMDQyOTE4fQ.mzQy4f5-DUAJiSWkjDdwmCA460eWWHU0a8W6JLbcu_Bu_TWiawYhgJ69pjoRi_Spc4LfHoovSFls81XAId2TVeRf4ZcyUV23YcQ3m_PeWVhtdkMLG9CsphxUAze4A5M9--Ses_DAfUDyr3Eghw7TN4B9PeMZO_JEZg5zNNRR2kGUJemcvGDxkOe_hZue_sdYQPfidDsqqjWLIAu-z5UB_BHlilKnn6MHnXs2eZkqqGI6iUAlXX-Kq02mT9XWo1i-58n-N26l1Zabili_JPCzPJS69VCX0S8xutpI_SxuC5C8-bp76A1LJVf6R3o8vd46lCFphKZqo6mt_7PJEQaD8A",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: "tag3, tag4",
      privacy: "public",
      category: "entertainment",
      license: "creativeCommon",
      subUserName: "Sub User 2",
      status: "pending",
    },
  ];

export default function AllUploadRequests() {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
      const fetchPendingRequests = async () => {
        try {
          const response = await fetch("/api/workflow/pending-requests");
          if (response.ok) {
            const data = await response.json();
            console.log("allRequests", data.data)
            setPendingRequests(data.data);
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
          <Breadcrumb pageName="All Upload Requests" />
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <WorkflowTable data={ pendingRequests}/>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
