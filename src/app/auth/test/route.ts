import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User"

type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  db();
  await UserModel.insertMany({
    firstName: "Arjun",
    lastName: "K V"
  })
  let user = await UserModel.find();
  return NextResponse.json({ message: "Hello from Next.js!" , user});
}
