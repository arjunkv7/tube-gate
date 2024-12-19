import { ObjectId } from "mongodb";
import mongoose, { Document, Schema, model } from "mongoose";
import { string } from "zod";

export interface User extends Document {
  firstName?: string;
  lastName?: string;
  image?: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  subUser?: boolean;
  mainUserId?: any;
  email: string;
  password: string;
  deleted: boolean
  _id: ObjectId
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
    subUser: Boolean,
    mainUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    image: String,
    googleRefreshToken: String,
    googleAccessToken: String,
    password: String,
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

let UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  model<User>("users", userSchema);

export default UserModel;
