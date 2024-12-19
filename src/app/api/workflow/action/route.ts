import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { google } from "googleapis";
import { getUser, getUserGoogleToken, addSubUser } from "@/lib/user";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";
import { getServerSession } from "next-auth/next";
import { checkAndRefreshToken, updateVideoVisibility } from "@/lib/youtube";
import { updateWorkflowStatus } from "@/lib/workflow";

export async function POST(req: NextRequest) {
  db();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Not authenticated" });
  }
  let userDetails = await getUser(session?.user?.email);

  if (!userDetails || userDetails.subUser)
    return NextResponse.json({ message: "Not authorized" });

  let checkTokenResponse = await checkAndRefreshToken(
    userDetails._id.toString(),
    userDetails.googleAccessToken!,
    userDetails.googleRefreshToken!,
  );
  let userGoogleToken = "";
  if (checkTokenResponse.success) {
    userGoogleToken = checkTokenResponse.accessToken || "";
  }

  let { videoId, workflowId, action } = await req.json();
  if (action == "APPROVED") {
    // console.log("insdie approve", videoId, workflowId, action)
    let response = await updateVideoVisibility(
      userGoogleToken,
      videoId,
      "public",
    );
    await updateWorkflowStatus(workflowId, action);
    return NextResponse.json("Success");
  } else if (action == "REJECTED") {
    // console.log("inside reject")
    await updateWorkflowStatus(workflowId, action);
    return NextResponse.json("Success");
  }

  return NextResponse.json("Action is required");
}
