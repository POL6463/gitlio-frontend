import React, { useState } from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';

export default function ContactSideBar() {
  const {
    contactInfo,
    setContactName,
    setContactEmail,
    setTistoryUrl,
    setGithubUrl,
    setVelogUrl,
  } = ContactSidebarStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
  };

  const handleTistoryUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTistoryUrl(e.target.value);
  };

  const handleGithubUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(e.target.value);
  };

  const handleVelogUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(e.target.value);
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
        placeholder="이메일"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <hr className="w-full mt-10" />
      <div className="flex flex-row justify-start w-full mt-5">
        <span>Github</span>
      </div>
      <input
        type="text"
        value={contactInfo.githubUrl}
        onChange={handleGithubUrlChange}
        placeholder="블로그 주소"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <div className="flex flex-row justify-start w-full mt-5">
        <span>Tistory</span>
      </div>
      <input
        type="text"
        value={contactInfo.tistoryUrl}
        onChange={handleTistoryUrlChange}
        placeholder="블로그 주소"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <div className="flex flex-row justify-start w-full mt-5">
        <span>Velog</span>
      </div>
      <input
        type="text"
        value={contactInfo.velogUrl}
        onChange={handleVelogUrlChange}
        placeholder="블로그 주소"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
    </div>
  );
}
