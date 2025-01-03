"use client"
import React from "react";

const CallToAction = () => {
  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="relative bg-[#4CAF50] rounded-xl ">
        <div className="flex items-center justify-between p-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl text-center md:text-left md:text-3xl text-white font-normal mb-6">
              Know a tech event? <br/>
              Share it to help others find and join by adding yours to the list!
            </h3>
            <div className="flex justify-center md:justify-start flex-wrap gap-4">
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors" onClick={() => window.open("https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md")}>
                Contribute
              </button>
              <button className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors" onClick={() => window.open("https://fossunited.org/c/chennai")}>
                Visit Us
              </button>
            </div>
          </div>
        
        </div>
      </div>
      
      <p className="text-center mt-16 mb-2 text-gray-600">
        Made with luv from Hari and Justin 💚 FOSS United Chennai
      </p>
    </div>
  );
};

export default CallToAction;