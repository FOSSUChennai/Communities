import GitHubButton from "../components/GitHubButton";

const NavBar = () => {
    return (
      <nav
        className="w-full flex-1 bg-[#fafafa] text-black py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center"
      >
        <a href="#" className="text-xl font-semibold">tamilnadu.tech</a>
        <div className="space-x-4">
        <GitHubButton />
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  