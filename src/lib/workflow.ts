import mongoose, { mongo } from "mongoose";
import { ObjectId } from "mongodb";
import { Workflow } from "@/model/index";

// Function to create a new workflow
export default async function createWorkflow(workflowData: any) {
  try {
    const workflow = new Workflow({
      videoId: workflowData.videoId,
      mainUserId: workflowData.mainUserId,
      subUserId: workflowData.subUserId,
    });
    await workflow.save();
    return workflow;
  } catch (error: any) {
    console.error("Error creating workflow:", error);
    return { success: false, error: error.message };
  }
}

export async function updateWorkflowStatus(workflowId: string, status: string) {
  try {
    let updatedDoc = await Workflow.findByIdAndUpdate(
      workflowId,
      {
        status: status,
      },
      { new: true },
    );
    if (!updatedDoc) {
      console.log(`Workflow id: ${workflowId} not matched ..`);
      return {
        success: false,
        error: `Workflow id: ${workflowId} not matched`,
      };
    }
    return { success: true, data: updatedDoc };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

export async function getPendingRequests(userId: mongoose.Types.ObjectId) {
  try {
    let allRequests = await Workflow.find({
      mainUserId: new ObjectId(userId),
      status: "PENDING",
    })
    .sort({ _id: -1})
      .populate("videoId subUserId", "-_id -password -mainUserId -userId")
      .lean();
    return allRequests;
  } catch (error) {
    throw error;
  }
}

export async function getApprovedRequests(userId: mongoose.Types.ObjectId) {
  try {
    let allRequests = await Workflow.find({
      mainUserId: new ObjectId(userId),
      status: "APPROVED",
    })
    .sort({ _id: -1})
      .populate("videoId subUserId", "-_id -password -mainUserId -userId")
      .lean();
    return allRequests;
  } catch (error) {
    throw error;
  }
}

export async function getAllApproveRequests(userId: mongoose.Types.ObjectId) {
  try {
    let allRequests = await Workflow.find({
      subUserId: new ObjectId(userId)
    })
    .sort({ _id: -1})
      .populate("videoId subUserId", "-_id -password -mainUserId -userId")
      .lean();
    return allRequests;
  } catch (error) {
    throw error;
  }
}