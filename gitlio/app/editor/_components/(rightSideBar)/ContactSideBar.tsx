'use client';
import React, { useState } from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';
import { SiGithub } from 'react-icons/si';
import ContactSelectOption from './ContactSelectOption';
import ContactTextArea from './ContactTextArea';

export default function ContactSideBar() {
  const {
    contactInfo,
    setContactName,
    setContactEmail,
    setContactMessage,
    setGithubUrl,
    setSelectedBlog,
    setSelectedBlogUrl,
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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(e.target.value);
  };

  const handleGithubUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(e.target.value);
  };

  const handleBlogChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlog(e.target.value);
  };

  const handleBlogUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBlogUrl(e.target.value);
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
      <div className="flex flex-row justify-center w-full mt-5">
        <span className="font-semibold">send your message</span>
      </div>
      <div className="flex flex-col justify-between items-start w-full h-auto mt-2">
        <div className="flex flex-col justify-start w-full min-h-[120px]">
          <ContactTextArea
            value={contactInfo.contactMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex justify-end w-full mt-3">
          <button className="btn btn-primary btn-sm w-auto">Send</button>
        </div>
      </div>
      <hr className="w-full mt-10" />
      <div className="flex flex-row justify-start items-center w-full mt-5">
        <span>Github</span>
        <SiGithub className="ml-2 text-xl mr-2 shrink-0" />
      </div>
      <input
        type="text"
        value={contactInfo.githubUrl}
        onChange={handleGithubUrlChange}
        onKeyDown={handleKeyDown}
        placeholder="github 주소"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <hr className="w-full mt-10" />
      <div className="flex flex-col justify-evenly items-start w-full mt-5">
        <span className="w-full">Blog</span>
      </div>
      <ContactSelectOption onChange={handleBlogChange} />
      <div className="flex w-full">
        <input
          type="text"
          value={contactInfo.selectedBlogUrl}
          onChange={handleBlogUrlChange}
          onKeyDown={handleKeyDown}
          placeholder="insert your blog url"
          className="input-md w-full bg-neutral-200 rounded-xl mt-5"
        />
      </div>
    </div>
  );
}
