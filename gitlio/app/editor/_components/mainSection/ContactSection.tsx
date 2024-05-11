'use client';
import { MdEmail } from 'react-icons/md';
import {
  SiTistory,
  SiVelog,
  SiGithub,
  SiInstagram,
  SiFacebook,
  SiKakao,
} from 'react-icons/si';
import ContactSidebarStore from '@/store/contactSidebarStore';

export default function ContactSection() {
  const { contactInfo } = ContactSidebarStore();

  return (
    <div className="bg-white w-[800px] flex flex-col flex-1 justify-start rounded-xl pb-5">
      <h1 className="text-3xl font-semibold ml-10 mr-5 pt-5">#Contact</h1>
      <div className="flex flex-col items-center h-full w-full mt-5">
        <div className="flex flex-col justify-evenly items-center w-[630px] min-h-[300px] px-5 bg-neutral-content/30 rounded-3xl shadow-md">
          {contactInfo.name ? (
            <div className="text-lg font-semibold mb-8">{contactInfo.name}</div>
          ) : (
            <div className="font-bold text-zinc-300 text-xl">
              insert your name
            </div>
          )}
          <div className="flex flex-wrap w-full justify-center items-center">
            <div className="flex w-[295px] max-w-[295px] justify-center items-center mb-2">
              <MdEmail className="text-xl mr-2" />
              <div className="break-words overflow-hidden text-ellipsis">
                {contactInfo.email}
              </div>
            </div>
            {contactInfo.blogUrls.map((blog) => (
              <div
                key={blog.id}
                className="flex w-[295px] max-w-[295px] justify-center items-center mb-2"
              >
                {blog.faviconUrl ? (
                  <img
                    src={blog.faviconUrl}
                    alt="Blog Favicon"
                    className="w-5 h-5 mr-2"
                  />
                ) : (
                  ''
                )}
                <div className="break-words overflow-hidden text-ellipsis w-full">
                  {blog.url ? blog.url : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
