import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "TubeGate | Manage Your YouTube Video Uploads",
  description: "TubeGate is an intuitive platform for managing video uploads to YouTube, featuring approval workflows and sub-user management.",
};


export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
