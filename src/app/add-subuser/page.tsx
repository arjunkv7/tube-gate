"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, useEffect, useState } from "react";

export default function AddSubUser() {
  const [firstName, setfirstName] = useState<String | null>("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("")

  interface UploadResponse {
    videoId: string;
    error?: string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let body = {
      firstName,
      lastName,
      email
    }

    try {
      const response = await fetch("/api/add-subuser", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data: UploadResponse = await response.json();
      if (response.ok) {
       
        alert("Video uploaded successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(error?.message);
    } finally {
     
    }
  }
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <Breadcrumb pageName="Add New Sub User" />
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setfirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      onChange={(e) => setlastName(e.target.value)}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
