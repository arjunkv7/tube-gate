import { User } from "@/model/User";
import UserModel from "@/model/User";
import db from "@/lib/mongodb";

export async function getUser(email: string) {
    try {
        await db()
        let user = await UserModel.findOne({ email }).lean();
        if(user) return user as User | null; // Type cast to User;
        return null;

    } catch (error) {
        console.log(error);
        return null;
    }
}