import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function TopIconBar() {
  return (
    <div className="fixed left-[350px] top-[67px] z-50 space-y-8">
      <div className="flex flex-col justify-evenly items-center w-full h-auto">
        <div className="w-1 bg-black h-[250px]"></div>
        <div className="flex flex-col justify-between items-center h-auto">
          <a
            href="https://github.com"
            className="text-black hover:text-white transition-colors duration-300"
          >
            <FaGithub size={50} />
          </a>
          <a
            href="https://twitter.com"
            className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
          >
            <FaTwitter size={50} />
          </a>
          <a
            href="https://linkedin.com"
            className="text-cyan-500 hover:text-cyan-400 transition-colors duration-300"
          >
            <FaLinkedin size={50} />
          </a>
        </div>
      </div>
    </div>
  );
}
