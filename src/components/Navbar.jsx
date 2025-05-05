import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-4 justify-between bg-indigo-800 text-white w-full shadow-md">
      <div className="logo font-bold text-2xl flex items-center">
        <span className="text-white">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-white">IQ/&gt;</span>
      </div>

      <nav className="flex items-center">
        <ul className="flex gap-6 mr-6 text-lg">
          <li className="hover:text-indigo-300 cursor-pointer">Home</li>
          <li className="hover:text-indigo-300 cursor-pointer">About</li>
          <li className="hover:text-indigo-300 cursor-pointer">Contact</li>
        </ul>

        <a href="https://github.com/rishabsharma07" target="_blank" rel="noopener noreferrer">
          <button className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1 rounded-full transition-colors duration-200">
            <img className="invert w-6 mr-2" src="/icons/github.svg" alt="GitHub" />
            <span className="font-semibold">GitHub</span>
          </button>
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
