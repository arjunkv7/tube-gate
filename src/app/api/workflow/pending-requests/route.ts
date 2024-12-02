import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import { getUser, getUserGoogleToken, addSubUser } from "@/lib/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { getPendingRequests, updateWorkflowStatus } from "@/lib/workflow";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  db();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Not authenticated" });
  }
  let userDetails = await getUser(session?.user?.email);
  console.log(mongoose.models)
  if (!userDetails || userDetails.subUser)
    return NextResponse.json({ message: "Not authorized" });

  // console.log("sdsl")
  let pendingRequests = await getPendingRequests(userDetails._id);

  return NextResponse.json({
    succes: true,
    data: pendingRequests,
  });
}
