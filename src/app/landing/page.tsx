import React from "react";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-black dark:bg-graydark dark:text-white">
      {/* Hero Section */}
      <header className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto flex flex-col items-center px-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            {/* <h1 className="text-4xl font-bold md:text-5xl">
              Welcome to <span className="text-white">TubeGate</span>
            </h1> */}
            <TextGenerateEffect
              words="Welcome to TubeGate"
              className=" text-bold text-4xl leading-snug tracking-wide text-black dark:text-white md:text-5xl"
            />
            <TextGenerateEffect
              className="mt-4 text-lg"
              words=" Simplify your YouTube workflow with seamless team collaboration"
            />

            <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/signin"
                className="rounded bg-white px-6 py-3 text-lg font-semibold text-blue-600 hover:bg-opacity-90"
              >
                Get Started
              </Link>
              <Link
                href="/features"
                className="rounded border-2 border-white px-6 py-3 text-lg font-semibold text-white hover:bg-white hover:text-blue-600"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVuXYeg8BmaRDeBBzzblL-C8RPVXEVi26zsw&s"
              alt="Teamwork"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 dark:bg-boxdark">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-black dark:text-white">
            Why Choose TubeGate?
          </h2>
          <p className="mt-4 text-center text-graydark dark:text-bodydark2">
            Built for YouTubers who value efficiency and collaboration.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Main & Subuser Accounts",
                description:
                  "Assign roles to video editors and streamline workflows.",
                icon: "👥",
              },
              {
                title: "Approval Workflow",
                description:
                  "Approve or reject videos before they go live on YouTube.",
                icon: "✔️",
              },
              {
                title: "YouTube Integration",
                description:
                  "Publish approved videos directly to your YouTube channel.",
                icon: "📹",
              },
              {
                title: "User-Friendly Dashboard",
                description:
                  "Manage video statuses and approvals in one place.",
                icon: "📊",
              },
              {
                title: "Seamless Notifications",
                description:
                  "Stay updated with requests and approvals in real-time.",
                icon: "🔔",
              },
              {
                title: "Customizable Privacy Settings",
                description:
                  "Control video privacy with ease (public, private, unlisted).",
                icon: "🔒",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md dark:bg-meta-4"
              >
                <div className="mb-4 text-5xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-center text-bodydark dark:text-bodydark1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">What Creators Say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                feedback:
                  "TubeGate transformed the way we collaborate. Approvals are so much faster now!",
                image: "/user1.jpg",
              },
              {
                name: "Samantha Lee",
                feedback: "I love the dashboard and YouTube integration. Super easy to use!",
                image: "/user2.jpg",
              },
              {
                name: "Chris Brown",
                feedback:
                  "Assigning roles and managing approvals has never been this easy.",
                image: "/user3.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-white p-6 text-black dark:bg-boxdark dark:text-white"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mb-4 h-16 w-16 rounded-full"
                />
                <p className="text-center text-bodydark dark:text-bodydark1">
                  "{testimonial.feedback}"
                </p>
                <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer Section */}
      <footer className="bg-blue-800 py-6 text-center text-white">
        <p>&copy; 2024 TubeGate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
