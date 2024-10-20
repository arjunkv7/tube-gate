import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { google } from "googleapis";
import { getUserGoogleToken } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest) {
  db();
  const formData = await req.formData();
  const file = formData.get("video") as File;
  const session = await getServerSession( authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { status: false, message: "Unauthorized: No valid session found" },
      { status: 401 }
    );
  }

  let userGoogleToken = await getUserGoogleToken(session?.user?.email);

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: userGoogleToken });
  console.log("toke: ",userGoogleToken)

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });
  const fileSize = file.size;
  console.log(fileSize, file)

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);

  const response = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: formData.get("title")?.toString() || "Untitled Video",
        description: formData.get("description")?.toString() || "",
        tags: ["nextjs", "youtube", "upload"],
        categoryId: "22", // People & Blogs
      },
      status: { privacyStatus: "public" },
    },
    media: { body: stream },
  });

  return NextResponse.json({
    status: true,
    message: "success",
  });
}

export async function GET(req: NextRequest) {
  db();
  await UserModel.insertMany({
    firstName: "Arjun",
    lastName: "K V",
  });
  let user = await UserModel.find();
  return NextResponse.json({ message: "Hello from Next.js!", user });
}
