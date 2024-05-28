'use client';
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { ContactState } from '@/store/contactSidebarStore';

interface ContactOptionProps {
  contactInfo: ContactState;
}

const ContactOptionOne: React.FC<ContactOptionProps> = ({ contactInfo }) => {
  return (
    <div className="flex flex-col items-center w-fit mx-10 px-6 bg-neutral-content/30 rounded-3xl shadow-md">
      <div className="text-lg font-semibold mt-6">
        {contactInfo.name ? (
          contactInfo.name
        ) : (
          <span className="font-bold text-zinc-300">insert your name</span>
        )}
      </div>
      <div className="flex flex-wrap w-full justify-center items-center mt-6">
        <div className="flex w-[295px] justify-start items-center mb-6">
          <MdEmail className="text-xl mr-2" />
          <div className="flex justify-start items-center break-all text-sm max-w-[267px]">
            {contactInfo.email}
          </div>
        </div>
        {contactInfo.blogUrls.map((blog) => (
          <div
            key={blog.id}
            className="flex w-[295px] max-w-[295px] justify-start items-center mb-6"
          >
            {blog.faviconUrl && (
              <img
                src={blog.faviconUrl}
                alt="Blog Favicon"
                className="w-5 h-5 mr-2 shrink-0"
              />
            )}
            <div className="flex justify-start items-center break-all text-sm max-w-[267px]">
              {blog.url || ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactOptionOne;
