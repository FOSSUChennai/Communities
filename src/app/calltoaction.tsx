"use client";

import React from "react";

const CallToAction = () => {
  const handleRedirect = (url: string) => window.open(url, "_blank", "noopener");

  const LINKS = {
    contribute: "https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md",
    visit: "https://fossunited.org/c/chennai"
  };

  return (
    <div className="px-4 py-8 md:p-8 lg:p-16">
      <div className="bg-[#4CAF50] rounded-xl shadow-sm">
        <div className="flex items-center p-6 md:p-8">
          <div className="w-full max-w-2xl">
            <h3 className="mb-6 text-2xl md:text-3xl text-white text-center md:text-left">
              Know a tech event? Share it to help others find and join by adding yours to the list!
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={() => handleRedirect(LINKS.contribute)}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 active:bg-gray-900 transition"
              >
                Contribute
              </button>
              <button
                onClick={() => handleRedirect(LINKS.visit)}
                className="px-6 py-2 border-2 border-white text-white rounded hover:bg-white/10 active:bg-white/20 transition"
              >
                Visit Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        Made with luv from Hari and Justin{" "}
        <span role="img" aria-label="green heart">
          💚
        </span>{" "}
        FOSS United Chennai
      </footer>
    </div>
  );
};

export default CallToAction;