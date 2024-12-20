"use client";
import ECommerce from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UploadVideo() {
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [category, setCategory] = useState("");
  const [license, setLicense] = useState("standard");
  const [uploading, setUploading] = useState<boolean>(false);
  const [videoId, setVideoId] = useState("");
  const router = useRouter();
  

  interface UploadResponse {
    videoId: string;
    error?: string;
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files?.length > 0) {
      setVideo(e.target.files[0]);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    // console.log("form submitted");
    const formData = new FormData();
    if (!video) {
      alert("Please select a video");
      return;
    }
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("privacy", privacy);
    formData.append("category", category);
    formData.append("license", license);

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();
      if (response.ok) {
        setVideoId(data.videoId);
        alert("Video uploaded successfully!");
        router.push('/upload-request-history')
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <Breadcrumb pageName="Upload video" />
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Video details
              </h3>
            </div>
            <form action="" onSubmit={handleUpload}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Video Title
                      *
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      placeholder="Enter video title"
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* <SelectGroupOne /> */}

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Video Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={6}
                    placeholder="Enter video description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                    placeholder="Enter tags"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Privacy Setting
                  </label>
                  <select
                    onChange={(e) => setPrivacy(e.target.value)}
                    value={privacy}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                  </select>
                </div> */}

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Category
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    placeholder="Enter category"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    License
                  </label>
                  <select
                    onChange={(e) => setLicense(e.target.value)}
                    value={license}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="standard">Standard YouTube License</option>
                    <option value="creative_common">Creative Commons</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Attach file
                  </label>
                  <input
                    onChange={handleFileChange}
                    accept="video/mp4,video/x-m4v,video/*"
                    type="file"
                    required
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:focus:border-primary"
                  />
                </div>

                <button className="flex justify-center rounded bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90 w-auto">
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
