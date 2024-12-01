import Video from "@/model/Video";

export async function insertVideo(videoDetails: object) {
    try {
        let response = (await Video.create(videoDetails)).save();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}