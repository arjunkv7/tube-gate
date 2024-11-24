import { google } from "googleapis";
import { Readable } from "stream";

export interface YouTubeVideoMetadata {
  id?: string; // Unique identifier for the video
  title?: string; // The title of the video
  description?: string; // Detailed description of the video's content
  tags?: string[]; // Array of tags for categorization
  category?: string; // Category or genre of the video
  thumbnailUrl?: string; // URL of the thumbnail image
  duration?: number; // Duration of the video in seconds
  uploadDate?: Date; // Date and time the video was uploaded
  views?: number; // Total number of views
  likes?: number; // Total number of likes
  dislikes?: number; // Total number of dislikes (optional as YouTube now hides dislikes)
  commentsCount?: number; // Total number of comments
  privacyStatus?: "public" | "private" | "unlisted"; // Privacy status of the video
  language?: string; // Language of the video content
  subtitles?: boolean; // Indicates if the video has subtitles
  channelId?: string; // The ID of the channel that owns the video
  channelName?: string; // The name of the channel that owns the video
}

export let uploadVideo = (
  accessToken: string,
  file: File,
  metadata: YouTubeVideoMetadata,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });
      const youtube = google.youtube({ version: "v3", auth: oauth2Client });
      const fileSize = file.size;
      console.log(fileSize, file);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const stream = Readable.from(buffer);

      const response = await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: {
            title: metadata.title || "Untitled Video",
            description: metadata.description || "",
            tags: ["nextjs", "youtube", "upload"],
            categoryId: "22", // People & Blogs
          },
          status: { privacyStatus: "public" },
        },
        media: { body: stream },
      });
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
