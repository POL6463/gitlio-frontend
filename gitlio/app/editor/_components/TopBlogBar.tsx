'use client';
import ContactSidebarStore from '@/store/contactSidebarStore';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function TopBlogBar() {
  const { contactInfo } = ContactSidebarStore();
  return (
    <div className="fixed left-[350px] top-[67px] z-50 space-y-8">
      <div className="flex flex-col justify-evenly items-center w-full h-auto">
        <div className="w-1 bg-black h-[150px] mt-32"></div>
        <div className="flex flex-col justify-center bg-[#555459] items-center h-auto rounded-xl border-2 border-slate-800 p-2 box-border space-y-2">
          {contactInfo.blogUrls.map((blog) => (
            <a
              key={blog.id}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {blog.faviconUrl ? (
                <div className="w-10 h-10">
                  <img
                    src={blog.faviconUrl}
                    alt="Blog Icon"
                    className="w-full h-full"
                  />
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
