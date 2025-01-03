import { ModeToggle } from "../components/mode-toggle";
import GitHubButton from "../components/GitHubButton";


const NavBar = () => {
    return (
      <nav
        className="w-full flex-1 bg-[#fafafa] dark:bg-dark-content text-black dark:text-white py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center"
      >
        <a href="#" className="text-xl font-semibold">tamilnadu.tech</a>
        <div className="space-x-4 flex items-center">

          <GitHubButton />
          <ModeToggle />
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  
