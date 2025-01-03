"use client";

import { useState, useEffect } from 'react';
import { GithubLogo } from 'phosphor-react'; // Replace 'some-library' with the actual library name

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

          <a className="px-4 py-2 text-[#667085]  border shadow-sm rounded-md" href="https://github.com/FOSSUChennai/Communities">
            <GithubLogo size={20}  className="inline-block m-2 mb-3 " />
            {stars !== null ? <span className='text-base'>Contribute {stars} ★</span> : <span className='text-base'>Loading...</span>} 
          </a>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  