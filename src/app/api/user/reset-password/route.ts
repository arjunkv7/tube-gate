import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { google } from "googleapis";
import { getUser, getUserGoogleToken, addSubUser, changePassword } from "@/lib/user";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";
import { getServerSession } from "next-auth/next";


export async function POST(req: NextRequest) {
    db();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" });
    }
    let user = await getUser(session.user.email || "");
    let { newPassword } = await req.json();

    let response = await changePassword(user?._id, newPassword);
    return NextResponse.json({
        message: "Password updated successfully"
    });
  }