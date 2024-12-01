import mongoose, { Document, Schema, model, models } from 'mongoose';

// Interface for the Workflow document
export interface IWorkflow extends Document {
  videoId: mongoose.Types.ObjectId;
  mainUserId: mongoose.Types.ObjectId;
  subUserId: mongoose.Types.ObjectId;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const workflowSchema = new Schema<IWorkflow>(
  {
    videoId: { type: Schema.Types.ObjectId, ref: 'videos', required: true },
    mainUserId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    subUserId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  { timestamps: true } // Automatically manages `createdAt` and `updatedAt`
);

// Export the model
const Workflow = (models.workflow as mongoose.Model<IWorkflow>) || model<IWorkflow>('workflow', workflowSchema);
export default Workflow;
