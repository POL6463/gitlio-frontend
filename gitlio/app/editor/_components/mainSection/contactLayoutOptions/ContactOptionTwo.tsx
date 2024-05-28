'use client';
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { ContactState } from '@/store/contactSidebarStore';

interface ContactOptionProps {
  contactInfo: ContactState;
}

const ContactOptionTwo: React.FC<ContactOptionProps> = ({ contactInfo }) => {
  return (
    <div className="flex flex-row justify-start items-center w-fit mx-10 px-6 bg-neutral-content/30 rounded-3xl shadow-md">
      <div className="text-lg font-semibold mr-6 mt-0 max-w-[54px]">
        {contactInfo.name ? (
          contactInfo.name
        ) : (
          <div className="font-bold text-zinc-300 text-center max-w-[54px] mt-0 py-2 box-border">
            insert your name
          </div>
        )}
      </div>
      <div className="flex flex-wrap w-auto justify-center items-center mt-6 flex-1">
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

export default ContactOptionTwo;
