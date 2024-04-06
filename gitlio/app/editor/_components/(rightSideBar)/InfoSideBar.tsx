'use client';
import React from 'react';
import InfoSidebarStore from '@/store/infoSidebarStore';

export default function InfoSideBar() {
  // useProfileStore 훅을 이용하여 스토어의 상태와 액션들을 가져옵니다.
  const {
    profile,
    setProfileTitle,
    setProfileImage,
    setInfoContent,
    setTagList,
  } = InfoSidebarStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoContent(e.target.value);
  };

  const handleTagListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
      .split(',')
      .map((tag) =>
        tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`
      );
    setTagList(tags);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      fileReader.onload = () => {
        setProfileImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-96">
      {/* ... */}
      <input
        type="text"
        value={profile.title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="input-md w-full max-w-xs bg-neutral-200 rounded-xl"
      />
      <input
        type="text"
        value={profile.infoContent}
        onChange={handleContentChange}
        placeholder="Description"
        className="input-md w-full h-[238px] mt-10 max-w-xs bg-neutral-200 rounded-xl"
      />
      <div className="flex justify-between mt-10">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="btn">
          이미지 수정
        </label>
        <input
          type="text"
          value={profile.tagList?.join(', ')}
          onChange={handleTagListChange}
          placeholder="Tags"
          className="input-md w-1/3 max-w-xs bg-neutral-200 rounded-xl"
        />
      </div>
    </div>
  );
}
