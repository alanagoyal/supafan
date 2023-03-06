import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-white py-4 mt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center">
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
    </footer>
  );
};

export default Footer;
