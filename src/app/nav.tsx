import { ModeToggle } from "../components/mode-toggle";

const NavBar = () => {
    return (
      <nav
        className="w-full flex-1 bg-[#fafafa] dark:bg-dark-content text-black dark:text-white py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center"
      >
        <a href="#" className="text-xl font-semibold">tamilnadu.tech</a>
        <div className="space-x-4 flex items-center">

          <a className="px-4 py-2 text-[#667085] dark:text-gray-400 underline rounded-md" href="https://github.com/FOSSUChennai/Communities">
            Contribute
          </a>
          <ModeToggle />
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  