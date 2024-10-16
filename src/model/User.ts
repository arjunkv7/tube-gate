import mongoose, { Document, Schema, model } from "mongoose";
import { string } from "zod";

export interface User extends Document {
  firstName?: string;
  lastName?: string;
  image?: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  email: string;
  password: string;
}

let userSchema: Schema<User> = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    googleRefreshToken: String,
    googleAccessToken: String,
    password: String,
  },
  { timestamps: true },
);

let UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  model<User>("users", userSchema);

export default UserModel;
