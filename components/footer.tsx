import React from "react";
import Github from "./github";

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-white pt-4 mt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-2">
          <p>
            Built with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://twitter.com/alanaagoyal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alana Goyal
            </a>{" "}
            for Supabase
          </p>
        </div>
        <div className="pt-1">
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
            href="https://github.com/alanagoyal/supafan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>Star on GitHub</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
