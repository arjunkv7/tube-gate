import { User } from "@/model/User";
import UserModel from "@/model/User";
import db from "@/lib/mongodb";

export type GoogleUserDetails = {
  email?: string;
  name?: string;
  image?: string;
  googleRefreshToken?: string;
  googleAccessToken?: string;
};

export type GoogleAccountDetails = {
  access_token?: string;
  refresh_token?: string;
};

export async function getUser(email: string) {
  try {
    await db();
    let user = await UserModel.findOne({ email }).lean();
    if (user) return user as User | null; // Type cast to User;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUserGoogleLogin(
  user: any,
  account: any,
) {
  try {
    await db();
    // If the user doesn't exist, create a new user in the collection
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      googleAccessToken: account.access_token,
      googleRefreshToken: account.refresh_token, // Store refresh token if needed
      image: user.image, // Optionally store user's profile image
    });

    await newUser.save();
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

export async function updateUserGoogleLogin(
  user: any,
  account: any,
) {
  try {
    await db();
    console.log(user, account)
    await UserModel.findOneAndUpdate(
      { email: user.email },
      {
        firstName: user.name,
        email: user.email,
        googleAccessToken: account.access_token,
        googleRefreshToken: account.refresh_token, // Store refresh token if needed
        image: user.image,
      },
    );
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

export async function getUserGoogleToken(
  email: any
) {
  try {
    await db();
    let user = await UserModel.findOne(
      { email: email }
    );
    return user?.googleAccessToken;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}
