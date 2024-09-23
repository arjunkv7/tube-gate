import mongoose, { Document, Schema, model } from "mongoose";

export interface User extends Document {
    firstName: string
    lastName: string
}

let userSchema: Schema<User> = new Schema({
    firstName: String,
    lastName: String
})

let UserModel = (mongoose.models.users as mongoose.Model<User>) || model<User>("users", userSchema)

export default UserModel;