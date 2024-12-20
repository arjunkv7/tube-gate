import mongoose, { Document, Schema, model, models } from 'mongoose';

// Interface for the Video document
export interface IVideo extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  filePath: string;
  youtubeVideoId?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: string;
  privacy?: string;
  category?: string;
  license?: string;
}

// Schema definition
const videoSchema = new Schema<IVideo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    filePath: { type: String, required: false },
    youtubeVideoId: { type: String, default: null },
    isPublished: { type: Boolean, default: false },
    tags: { type: Array, trim: true },
    privacy: { type: String, trim: true },
    category: { type: String, trim: true },
    license: { type: String, trim: true },
  },
  { timestamps: true } // Automatically manages `createdAt` and `updatedAt`
);

// Export the model, checking if it already exists
const Video = (models.videos as mongoose.Model<IVideo>) || model<IVideo>('videos', videoSchema);
export default Video;
