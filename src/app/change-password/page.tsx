"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect, useRouter } from 'next/navigation'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, useEffect, useState } from "react";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState<String | null>("");
  const [reEnteredPass, setReEnteredPass] = useState<String | null>("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  interface UploadResponse {
    message: string;
    error?: string;
  }

  useEffect(() => {
    console.log("userEffect")
    if(newPassword !== reEnteredPass) {
      setError(true)
      setErrorMessage("Password missmatch")
    } else {
      setError(false);
      setErrorMessage("")
    }
  }, [reEnteredPass])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false)
    setErrorMessage("")
    let body = {
      newPassword
    }

    try {
      const response = await fetch("/api/user/reset-password", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data: UploadResponse = await response.json();
      if (response.ok) {
       router.push('/')
        // alert("Video uploaded successfully!");
      } else {
        setError(true)
        setErrorMessage(data.message)
        // alert(`Error: ${data.message}`);
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
          <Breadcrumb pageName="Change Password" />
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
              {error && <h1 className="text-center mb-4.5 text-red-600">{errorMessage}</h1>}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      New Password
                    </label>
                    <input
                      type="password"
                      minLength={6}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Re-Enter Password
                    </label>
                    <input
                      onChange={(e) => setReEnteredPass(e.target.value)}
                      type="password"
                      placeholder="Re-enter your new password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>


                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
