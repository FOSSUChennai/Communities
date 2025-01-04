"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import githubIcon from "../../public/githubIcon.svg";

const NavBar = () => {
  
  //to state for the number of stars of the repository
   const [stars,setStars] = useState<number |null> (null)
  //fetching the number of stars of the repository
   useEffect(() =>{ 
    fetch("https://api.github.com/repos/FOSSUChennai/Communities")
    .then((res) => res.json())
    .then((data) => {
      setStars(data.stargazers_count)
    })
    .catch((err)=>{
      console.log(err)
    })


   })
    return (
      <nav
        className="w-full flex-1 bg-[#fafafa] text-black py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center"
      >
        <a href="#" className="text-xl font-semibold">tamilnadu.tech</a>
        <div className="space-x-4">

              <a className="flex items-center px-4 py-2 text-[#667085] border shadow-sm rounded-md hover:bg-gray-100 transition-colors duration-200" href="https://github.com/FOSSUChennai/Communities">
              <Image
                src={githubIcon}
                alt="Github star icon"
                className="w-5 h-5 mr-2"
              />
                <span className="text-sm font-medium hidden sm:inline">
                {stars !== null ? `Contribute ${stars} ★` : 'Loading...'}
                </span>
                <span className="text-sm font-medium sm:hidden">
                {stars !== null ? `${stars} ★` : 'Loading...'}
                </span>
              </a>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  