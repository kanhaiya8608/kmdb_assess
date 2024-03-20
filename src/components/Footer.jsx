import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-blue-500 text-white p-4 grid grid-cols-2 gap-4 bottom-0 w-full">
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/kanhaiya8608"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-blue-900"
        >
          <FaGithub className="mr-2" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/kanhaiyaverma/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-blue-900"
        >
          <FaLinkedin className="mr-2" /> LinkedIn
        </a>
      </div>
      <div className="text-right">Copyright @2023</div>
    </div>
  );
}

export default Footer;