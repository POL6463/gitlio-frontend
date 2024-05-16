'use client';
import React, { useState } from 'react';
import IntroSidebarStore from '@/store/introSidebarStore';
import IntroTagList from '../mainSection/introComponents/IntroTagList';
import SideBarIntroTagList from './SideBarIntroTagList';
import { useUserStore } from '@/store/userStore';
import { uploadImageToS3 } from '@/actions/portfolio';
import { usePathname } from 'next/navigation';

export default function IntroSideBar() {
  const [tagInput, setTagInput] = useState(''); // 태그 입력을 위한 새로운 상태
  const clerkId = useUserStore((state) => state.clerkId);

  const pathname = usePathname();

  const {
    profile,
    setProfileTitle,
    setProfileImage,
    setIntroDescription,
    setTagList,
  } = IntroSidebarStore();

  const handleTitleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleContentKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroDescription(e.target.value);
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
  const handleRemoveTag = (tagIndex: number) => {
    setTagList(profile.tagList.filter((tag, index) => index !== tagIndex));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageURL = await uploadImageToS3(
        file,
        clerkId,
        pathname + '/profile'
      );
      console.log('image URL: ' + imageURL);
      setProfileImage(imageURL);
    }
  };

  const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProfileImage('');
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
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <div className="flex flex-row justify-start w-full mt-10">
        <span>HashTag</span>
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange} // 입력 값이 변경될 때마다 tagInput 상태를 업데이트
        onKeyUp={handleAddTag}
        placeholder="Tags"
        className="input-md w-full bg-neutral-200 rounded-xl mt-2"
      />
      <div className="flex flex-wrap gap-2 mt-5">
        {profile.tagList.map((tag, index) => (
          <SideBarIntroTagList
            key={index}
            data={tag}
            onRemove={() => handleRemoveTag(index)}
          />
        ))}
      </div>
      <div className="flex flex-row justify-start w-full mt-5">
        <span>Description</span>
      </div>
      <textarea
        value={profile.introDescription}
        onChange={handleContentChange}
        onKeyUp={handleContentKeyUp}
        placeholder="Description"
        className="input-md w-full h-[160px] bg-neutral-200 rounded-xl resize-none overflow-hidden mt-2"
        style={{ paddingTop: '0.5rem' }}
      ></textarea>
      <div className="flex justify-around mt-10 w-full">
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
        <button className="btn" onClick={(e) => handleImageRemove(e)}>
          이미지 삭제
        </button>
      </div>
    </div>
  );
}
