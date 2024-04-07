'use client';
import React, { useState } from 'react';
import InfoSidebarStore from '@/store/infoSidebarStore';
import InfoTagList from '../mainSection/infoComponents/InfoTagList';
import SideBarInfoTagList from './SideBarInfoTagList';

export default function InfoSideBar() {
  const [tagInput, setTagInput] = useState(''); // 태그 입력을 위한 새로운 상태

  const {
    profile,
    setProfileTitle,
    setProfileImage,
    setInfoDescription,
    setTagList,
  } = InfoSidebarStore();

  const handleTitleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleContentKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoDescription(e.target.value);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      const newTag = tagInput.trim().startsWith('#')
        ? tagInput.trim()
        : `#${tagInput.trim()}`;
      setTagList([...profile.tagList, newTag]);
      setTagInput(''); // 태그를 추가한 후 입력 필드를 비웁니다.
    }
  };

  // 태그를 제거하는 함수
  const handleRemoveTag = (tagToRemove: string) => {
    setTagList(profile.tagList.filter((tag) => tag !== tagToRemove));
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
      <div className="flex flex-row justify-start w-full">
        <span>Title</span>
      </div>
      <input
        type="text"
        value={profile.title}
        onChange={handleTitleChange}
        onKeyUp={handleTitleKeyUp}
        placeholder="Title"
        className="input-md w-full bg-white rounded-xl border border-gray-300"
      />
      <hr className="w-full my-8 bg-gray-200 border dark:bg-gray-700" />
      <div className="flex flex-row justify-start w-full">
        <span>Description</span>
      </div>
      <textarea
        value={profile.infoDescription}
        onChange={handleContentChange}
        onKeyUp={handleContentKeyUp}
        placeholder="Description"
        className="input-md w-full h-[238px] bg-white border border-gray-300 rounded-xl resize-none overflow-hidden"
        style={{ paddingTop: '0.5rem' }}
      ></textarea>
      <div className="flex flex-row justify-start w-full mt-10">
        <span>HashTag</span>
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange} // 입력 값이 변경될 때마다 tagInput 상태를 업데이트
        onKeyUp={handleAddTag}
        placeholder="Tags"
        className="input-md w-full bg-white rounded-xl border border-gray-300"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {profile.tagList.map((tag, index) => (
          <SideBarInfoTagList
            key={index}
            data={tag}
            onRemove={() => handleRemoveTag(tag)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-10 w-full">
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
      </div>
    </div>
  );
}
