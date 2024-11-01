import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/mongodb";
import UserModel from "@/model/User";
import { google } from "googleapis";
import { getUser, getUserGoogleToken } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
    db();
    let { email, firstName, lastName } = await req.json();
    let userExist = await getUser(email);
    if(userExist) {
        return NextResponse.json({ message: "Email already exist"}, { status: 400 });
    }

    let newUser = await AddSubUser(firstName, lastName, email)
  }