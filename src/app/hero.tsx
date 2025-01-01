// "use client"
// import Image from "next/image";
// import React from "react";
// import rocket from "../../public/rocket.png";

// const Hero = () => {


//   return (
//     <>

//       <div className="bg-[#fafafa] px-4 md:px-8 lg:px-16 mb-48 flex my-16 items-start z-10">
//       <div className="container mx-auto text-center md:text-left px-4 flex flex-col md:flex-row items-center justify-between">
//         <div className="max-w-2xl z-10">
//         <h1 className="text-4xl text-black md:text-[68px] lg:text-[74px] font-semibold leading-tight">
//           Dont miss your <br />
//           next community
//           <br />
//           <span className="text-[#03b051] italic">meetup</span>
//         </h1>
//         <p className="mt-4 text-gray-600 text-[20px]">
//           meet. network. share
//         </p>
//         </div>
//         <div className="z-10">
//         <Image
//           src={rocket}
//           alt="Rocket illustration"
//           width={288}
//           height={365}
//         />
//         </div>
//       </div>
//       </div>


//       <div className={`absolute inset-0 z-0 w-[350px] h-[350px] md:w-[406px] md:h-[406px] bg-[#7eff5f]/75 rounded-full blur-[140px] md:blur-[200px] translate-x-[40px] translate-y-[120px] md:translate-x-[440px] md:translate-y-[120px]`} />

//     </>
//   );
// };

// export default Hero;
"use client"
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import rocket from "../../public/rocket.png";
import TechBackgroundAnimation from "../components/BackgroundAnimation";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <TechBackgroundAnimation />
      
      <div className="bg-transparent px-4 md:px-8 lg:px-16 z-10 w-full">
        <div className="container mx-auto text-center md:text-left px-4 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="max-w-2xl z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl text-black md:text-[68px] lg:text-[74px] font-semibold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Don't miss your <br />
              next community
              <br />
              <motion.span 
                className="text-[#03b051] italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                meetup
              </motion.span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-gray-600 text-[20px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              meet. network. share
            </motion.p>
          </motion.div>
          <motion.div 
            className="z-10 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={rocket}
              alt="Rocket illustration"
              width={288}
              height={365}
              className="rocket-image"
              priority
            />
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute inset-0 z-0 w-[350px] h-[350px] md:w-[406px] md:h-[406px] bg-[#7eff5f]/30 rounded-full blur-[140px] md:blur-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          left: "calc(50% - 203px)",
          top: "calc(50% - 203px)",
        }}
      />
    </div>
  );
};

export default Hero;