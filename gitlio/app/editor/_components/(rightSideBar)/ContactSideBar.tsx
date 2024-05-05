'use client';
import React, { useState } from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';
import { SiGithub } from 'react-icons/si';
import ContactSelectOption from './ContactSelectOption';
import ContactTextArea from './ContactTextArea';
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6';

export default function ContactSideBar() {
  const {
    contactInfo,
    setContactName,
    setContactEmail,
    setBlogUrl,
    addBlogUrl,
    removeBlogUrl,
  } = ContactSidebarStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
  };

  const handleBlogUrlChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBlogUrl(id, e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-96 pb-10">
      <div className="flex flex-row justify-start w-full mt-5">
        <span>Name</span>
      </div>
      <input
        type="text"
        value={contactInfo.name}
        onChange={handleNameChange}
        onKeyDown={handleKeyDown}
        placeholder="이름"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />

      <div className="flex flex-row justify-start w-full mt-5">
        <span>Email</span>
      </div>
      <input
        type="email"
        value={contactInfo.email}
        onChange={handleEmailChange}
        onKeyDown={handleKeyDown}
        placeholder="이메일"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <hr className="w-full mt-10" />
      <div className="flex flex-col justify-evenly items-start w-full mt-5">
        <div className="flex justify-start items-center w-[112px]">
          <div className="flex items-center text">Blog</div>
          <button
            onClick={addBlogUrl}
            className="w-auto btn btn-sm bg-transparent border-none shadow-none shrink-0 p-2 ml-2"
          >
            <FaRegSquarePlus className="text-xl" />
          </button>
        </div>
      </div>
      {contactInfo.blogUrls.map((blog) => (
        <div
          key={blog.id}
          className="flex justify-between items-center w-full mt-5"
        >
          <input
            type="text"
            value={blog.url}
            onChange={(e) => handleBlogUrlChange(blog.id, e)}
            onKeyDown={handleKeyDown}
            placeholder="블로그 URL 입력"
            className="input-md w-full bg-neutral-200 rounded-xl"
          />
          <button
            onClick={() => removeBlogUrl(blog.id)}
            className="w-auto btn btn-sm bg-transparent border-none shadow-none shrink-0 p-2 ml-2"
          >
            <FaRegSquareMinus className="text-xl" />
          </button>
        </div>
      ))}
    </div>
  );
}
