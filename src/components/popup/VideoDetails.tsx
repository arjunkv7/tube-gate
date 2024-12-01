import { VideoRequest } from "../Tables/WorkflowTable";

interface WorkflowDetails extends VideoRequest {
    workflowId?: string

}

// Popup Component for Video Details
interface VideoDetailsPopupProps {
  video: WorkflowDetails;
  onClose: () => void;
  onApprove?: (videoId: string, workflowId: string) => void;
  onReject?: (videoId: string, workflowId: string) => void;
}

const VideoDetailsPopup: React.FC<VideoDetailsPopupProps> = ({
  video,
  onClose,
  onApprove,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 rounded-lg bg-white p-6 dark:bg-boxdark md:w-2/3 lg:w-1/2">
        <button
          className="hover:bg-lightblue dark:hover:bg-lightgray absolute right-3 top-3 rounded-full bg-meta-4 p-2 text-white transition duration-200 dark:bg-meta-9 dark:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
          Video Details
        </h2>
        <p className="mb-2 text-black dark:text-white">
          <strong>Title:</strong> {video.title}
        </p>
        <p className="mb-2 text-black dark:text-white">
          <strong>Description:</strong> {video.description}
        </p>
        <p className="mb-2 text-black dark:text-white">
          <strong>Sub User:</strong> {video.subUserName}
        </p>
        <p className="mb-4 text-black dark:text-white">
          <strong>Status:</strong> {video.status}
        </p>
        {video.youtubeVideoId ? (
          <div className="mb-4">
            <iframe
              className="h-64 w-full"
              src={`https://www.youtube.com/embed/${video.youtubeVideoId}?rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          video.filePath && (
            <video controls className="mb-4 h-auto w-full">
              <source src={video.filePath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        )}
        <div className="flex justify-end space-x-4">
          <button
            className="rounded bg-success px-4 py-2 text-white transition duration-200 hover:bg-opacity-90"
            onClick={() => onApprove && onApprove(video.youtubeVideoId!, video.workflowId!)}
          >
            Approve
          </button>
          <button
            className="rounded bg-danger px-4 py-2 text-white transition duration-200 hover:bg-opacity-90"
            onClick={() => onReject && onReject(video.youtubeVideoId!, video.workflowId!)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export { VideoDetailsPopup };
