import { Package } from "@/types/package";
import { useState } from "react";
import { VideoDetailsPopup } from "../popup/VideoDetails";
import axios from "axios";

export interface VideoRequest {
  title: string;
  description?: string;
  filePath: string;
  youtubeVideoId?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: string;
  privacy?: string;
  category?: string;
  license?: string;
  accessToken?: string;
  subUserName: string; // Added field for sub user name
  status: string; // pending, approved, rejected
}

interface WorkflowTableProps {
  data: any[];
}

const WorkflowTable: React.FC<WorkflowTableProps> = ({ data }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoRequest | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleViewDetails = (video: VideoRequest) => {
    setSelectedVideo(video);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedVideo(null);
  };

  const handleApprove = async (videoId: string, workflowId: string) => {
    try {
        console.log("Inside approve ")
      const response = await axios.post(`/api/workflow/action`, {
        videoId,
        action: "Approved",
        workflowId: workflowId
      });
    //   console.log(`Approved request with Video ID: ${videoId}, Workflow ID: ${workflowId}`);
    //   console.log(response.data);
      // Add any additional logic, like refreshing the data or showing a success message
    } catch (error) {
      console.error("Error approving the request:", error);
    }
  };

  const handleReject = async (videoId: string, workflowId: string) => {
    try {
        console.log("Inside reject", videoId, workflowId)
        const response = await axios.post(`/api/workflow/action`, {
            videoId,
            action: "Rejected",
            workflowId: workflowId
          });
      // Add any additional logic, like refreshing the data or showing a success message
    } catch (error) {
      console.error("Error rejecting the request:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Requestor Name
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Video Title
              </th>
              <th className="min-w-[300px] px-4 py-4 font-medium text-black dark:text-white">
                Video Description
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {request.subUserId.firstName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {request.videoId.title}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {request.videoId.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className={`text-black dark:text-white ${request.videoId.status === 'approved' ? 'text-success' : request.videoId.status === 'rejected' ? 'text-danger' : 'text-warning'}`}>
                    {request.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    onClick={() => handleViewDetails(request)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopupOpen && selectedVideo && (
        <VideoDetailsPopup
          video={selectedVideo}
          onClose={handleClosePopup}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default WorkflowTable;


