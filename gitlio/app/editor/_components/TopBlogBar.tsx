'use client';
import ContactSidebarStore from '@/store/contactSidebarStore';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function TopBlogBar() {
  const { contactInfo } = ContactSidebarStore();
  return (
    <div className="fixed left-20 top-40">
      <div className="flex flex-col justify-evenly items-center w-full h-auto">
        <div className="flex flex-col justify-center bg-[#f7f7f7] items-center h-auto rounded-xl border-2 border-slate-800 p-2 box-border space-y-2">
          {contactInfo.blogUrls.map((blog) => (
            <a
              key={blog.id}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {blog.faviconUrl ? (
                <div className="w-8 h-8">
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
