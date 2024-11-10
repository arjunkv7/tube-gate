import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { google } from "googleapis";
import { getUser, getUserGoogleToken, addSubUser } from "@/lib/user";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";
import { getServerSession } from "next-auth/next";


export async function POST(req: NextRequest) {
    db();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" });
    }
   
    let { email, firstName, lastName } = await req.json();
    let userExist = await getUser(email);
    if(userExist) {
        return NextResponse.json({ message: "Email already exist"}, { status: 400 });
    }

    let newUser = await addSubUser(firstName, lastName, email, session?.user?._id || "")
    return NextResponse.json(newUser);
  }