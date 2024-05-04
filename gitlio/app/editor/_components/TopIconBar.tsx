import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function TopIconBar() {
  return (
    <div className="fixed left-[350px] top-[160px] transform -translate-y-1/2 z-50 space-y-6">
      <div className="flex flex-col items-center w-full">
        <div className="w-1 bg-cyan-500 h-24 rounded-full"></div>
        <a
          href="https://github.com"
          className="text-cyan-500 hover:text-cyan-400"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://twitter.com"
          className="text-cyan-500 hover:text-cyan-400"
        >
          <FaTwitter size={30} />
        </a>
        <a
          href="https://linkedin.com"
          className="text-cyan-500 hover:text-cyan-400"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    </div>
  );
}
