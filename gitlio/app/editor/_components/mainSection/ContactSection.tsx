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
            <div className="text-lg font-semibold mb-5">{contactInfo.name}</div>
          ) : (
            <div className="font-bold text-zinc-300 text-xl">
              insert your name
            </div>
          )}
          <div className="w-full flex justify-evenly items-center">
            <div className="flex flex-col justify-center">
              <div className="flex justify-start w-[210px] items-center mb-2">
                <MdEmail className="text-xl mr-2" />
                <div className="break-words max-w-[180px]">
                  {contactInfo.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {contactInfo.blogUrls.map((blog, index) => (
                <div
                  key={index}
                  className="flex justify-start w-auto items-center mb-2"
                >
                  {blog.faviconUrl && (
                    <img
                      src={blog.faviconUrl}
                      alt="Blog Favicon"
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <div className="break-words w-[255px] max-w-[250px]">
                    {blog.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}