'use client';
import React, { useState } from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';
import { SiGithub, SiTistory, SiVelog } from 'react-icons/si';

export default function ContactSideBar() {
  const {
    contactInfo,
    setContactName,
    setContactEmail,
    setGithubUrl,
    setSelectedBlog,
    setSelectedBlogUrl,
  } = ContactSidebarStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
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
    <div className="flex flex-col items-center w-96">
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
      <div className="flex justify-around w-full">
        <select
          className="select select-bordered select-sm w-1/2 max-w-xs mt-5"
          onChange={handleBlogChange}
        >
          <option disabled selected className="font-light">
            choose
          </option>
          <option value="Tistory">Tistory</option>
          <option value="Velog">Velog</option>
        </select>
        {contactInfo.selectedBlog && (
          <div className="flex justify-start items-center w-auto mt-5">
            <span>
              {contactInfo.selectedBlog === 'Tistory' ? (
                <SiTistory className="text-2xl text-orange-500" />
              ) : contactInfo.selectedBlog === 'Velog' ? (
                <SiVelog className="text-2xl text-green-600" />
              ) : (
                ''
              )}
              {/* 선택되지 않았을 때는 아무 것도 표시하지 않음 */}
            </span>
          </div>
        )}
      </div>
      <div className="flex w-full">
        <input
          type="email"
          value={contactInfo.selectedBlogUrl}
          onChange={handleBlogUrlChange}
          onKeyDown={handleKeyDown}
          placeholder="insert your blog url"
          className="input-md w-full bg-neutral-200 rounded-xl mt-8"
        />
      </div>
    </div>
  );
}
