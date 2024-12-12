import { ObjectId } from "mongodb";
import mongoose, { Document, Schema, model } from "mongoose";
import { string } from "zod";
 
interface menus {
    role: string,
    menus: []
}
let menuSchema: Schema = new Schema(
  {
    role: String,
    menus: Array
  },
  { timestamps: true },
);

let MenuModel =
  (mongoose.models.menus as mongoose.Model<menus>) ||
  model<menus>("menus", menuSchema);

export default MenuModel;
