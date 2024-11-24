import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { getUserGoogleToken, getUser } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";
import { uploadVideo } from "@/lib/youtube";

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

  let userDetails = await getUser(session?.user?.email);
  if(userDetails && userDetails.subUser) {
    console.log("is subuser")
    return NextResponse.json({
      status: true,
      message: "success subser",
    });
  }
  let response = await uploadVideo("", file, {})
  console.log(userDetails, "userdetails")
  let userGoogleToken = await getUserGoogleToken(session?.user?.email);

  console.log("toke: ",userGoogleToken)

  

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
