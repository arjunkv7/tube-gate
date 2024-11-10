import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { google } from "googleapis";
import { getUser, getUserGoogleToken, addSubUser, getSubUsers } from "@/lib/user";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";
import { getServerSession } from "next-auth/next";


export async function GET(req: NextRequest) {
    db();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" });
    }
   
    let newUser = await getSubUsers(session.user._id);
    return NextResponse.json(newUser);
  }