"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  // console.log("session: ", session, "status: ", status)
  // const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("api/auth/signin")
      // Redirect to the login page if not authenticated
      // router.push("/api/auth/signin");  // Or use your custom login page route
    }
  }, [status]);

  if (status === "loading") {
    // Show a loading state while checking the session
    return <p>Loading...</p>;
  }  

  return (
    <>
      {session ? (
        <>
          {/* <!-- ===== Page Wrapper Start ===== --> */}
          <div className="flex">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col lg:ml-72.5">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                user={session.user}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
          {/* <!-- ===== Page Wrapper End ===== --> */}
        </>
      ) : (
        <>
        <h1>;laskjdfdf</h1>
          <Link href= "http://localhost:3000/api/auth/signin">dfgsf</Link>
        </>
      )}
    </>
  );
}
