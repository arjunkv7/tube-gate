import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { getUserGoogleToken, getUser } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";
import { checkAndRefreshToken, uploadVideo } from "@/lib/youtube";
import { insertVideo } from "@/lib/video";
import triggerWorkFlow from "@/lib/workflow";

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest) {
  db();
  const formData = await req.formData();
  const file = formData.get("video") as File;
  const session = await getServerSession(authOptions);

  // Extract all form data values into an object
  const data = {
    // video: formData.get("video") as File,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    tags: (formData.get("tags") as string).split(","),
    privacy: formData.get("privacy") as string,
    category: formData.get("category") as string,
    // license: formData.get("license") as string,
  };

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { status: false, message: "Unauthorized: No valid session found" },
      { status: 401 },
    );
  }

  let userDetails = await getUser(session?.user?.email);
  let userGoogleToken = userDetails?.googleAccessToken || "";
  let googleRefreshToken = userDetails?.googleRefreshToken || "";
  if (userDetails && userDetails.subUser) {
    userGoogleToken = userDetails?.mainUserId?.googleAccessToken;
    googleRefreshToken = userDetails?.mainUserId?.googleRefreshToken;
    let videoData = {
      ...data,
      // userId: userDetails._id,
    };
    let checkTokenResponse = await checkAndRefreshToken(
      userDetails.mainUserId,
      userGoogleToken,
      userDetails?.mainUserId?.googleRefreshToken,
    );
    if (checkTokenResponse.success)
      userGoogleToken = checkTokenResponse.accessToken || "";
    // console.log(checkTokenResponse);
    let response: any = await uploadVideo(userGoogleToken, file, videoData);
    console.log("upload response: ", response.data.id, response );
    (videoData as any).videoId = response.data.id;
    (videoData as any).userId = userDetails._id;

    let videoDetails = await insertVideo(videoData);

    let workflowData = {
      mainUserId: userDetails.mainUserId,
      subUserId: userDetails._id,
      videoId: videoDetails._id,
    };
    await triggerWorkFlow(workflowData);
    return NextResponse.json({
      status: true,
      message: "Upload request submitted successfully",
    });
  }
  // console.log(userDetails, "userdetails")
  // let userGoogleToken = await getUserGoogleToken(session?.user?.email);
  // let response = await uploadVideo(userGoogleToken, file, {})


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
