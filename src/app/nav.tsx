import GitHubButton from "../components/GitHubButton";

const NavBar = () => {
  return (
    <nav
      className="w-full bg-[#fafafa] text-black py-4 px-4 md:px-8 lg:px-16 flex items-center justify-between"
    >
      <a href="#" className="text-xl font-semibold">
        tamilnadu.tech
      </a>
      <div className="space-x-4 flex items-center">
        <GitHubButton />
      </div>
    </nav>
  );
};

export default NavBar;
