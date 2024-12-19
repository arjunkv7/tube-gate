import { google } from "googleapis";
import { Readable } from "stream";
import axios from "axios";
import { updateUserToken } from "./user";

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
  // privacyStatus?: "public" | "private" | "unlisted"; // Privacy status of the video
  privacy?: string; // Privacy status of the video
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
      console.log(metadata);
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
          status: { privacyStatus: metadata.privacy || "private" },
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

export async function updateVideoVisibility(
  accessToken: string,
  videoId: string,
  privacyStatus: "private" | "public" | "unlisted",
) {
  try {
    // Initialize OAuth2 client with the access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Get YouTube API instance with the authorized client
    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    // Update the video privacy status
    const response = await youtube.videos.update({
      part: ["status"],
      requestBody: {
        id: videoId,
        status: {
          privacyStatus: privacyStatus,
          "embeddable": true
        },
      },
    });
    console.log("Video updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
  }
}

// Function to check if the Google access token is expired and refresh it if needed
type TokenResponse = {
  success: boolean;
  accessToken?: string;
  error?: string;
};

export async function checkAndRefreshToken(
  userId: string,
  googleAccessToken: string,
  refreshToken: string,
  // clientId: string,
  // clientSecret: string,
): Promise<TokenResponse> {
  try {
    // throw "";
    // Check the validity of the access token using the Google tokeninfo endpoint
    await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${googleAccessToken}`,
    );

    // Token is still valid
    return { success: true, accessToken: googleAccessToken };
  } catch (error: any) {
    if (true) {
      // Token is expired or invalid, refresh it
      console.log("Access token expired or invalid, refreshing...");
      try {
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          null,
          {
            params: {
              refresh_token: refreshToken,
              grant_type: "refresh_token",
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
            },
          },
        );
        console.log(response.data);
        const newAccessToken: string = response.data.access_token;
        await updateUserToken(userId, newAccessToken);
        return { success: true, accessToken: newAccessToken };
      } catch (refreshError: any) {
        console.error("Error refreshing token:", refreshError);
        return { success: false, error: refreshError.message };
      }
    } else {
      console.error("Error checking token:", error);
      return { success: false, error: error.message };
    }
  }
}
