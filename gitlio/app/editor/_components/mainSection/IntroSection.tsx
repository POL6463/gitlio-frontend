'use client';

import React, { useEffect, useRef } from 'react';
import IntroSidebarStore from '@/store/introSidebarStore';
import IntroTagList from './introComponents/IntroTagList';
import useLayoutStore from '@/store/layoutDesignStore';

export default function IntroSection() {
  const { profile } = IntroSidebarStore();
  const { intro } = useLayoutStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = 'inherit';
      element.style.height = `${element.scrollHeight}px`;
    }
  }, [profile.introDescription]);

  return (
<<<<<<< HEAD
    <div className="flex flex-col w-[800px] bg-white mt-10 rounded-3xl p-10">
      <h1 className="text-3xl font-semibold mr-5">#Introduction</h1>
      {intro.option === 'option3' ? (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex flex-col items-start h-full mr-15">
              <div className="w-[160px] h-[160px] my-6 mx-6 bg-cover bg-center rounded-full flex items-center justify-center">
                {profile.profileImage ? (
                  <img
                    className="w-full h-full rounded-full text-center object-cover"
                    src={profile.profileImage}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full rounded-full text-center flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">Profile</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-start w-full py-6 ml-6">
              {profile.title ? (
                <div className="flex flex-row w-full justify-start font-bold text-2xl mt-6">
                  {profile.title}
                </div>
              ) : (
                <div className="flex flex-row w-full justify-start font-bold text-zinc-300 text-2xl mt-6">
                  {'insert your title'}
                </div>
              )}

              <div className="flex flex-row justify-start w-full mt-5">
                {profile.tagList?.map((tag, index) => (
                  <IntroTagList key={index} data={tag} />
                ))}
              </div>
            </div>
          </div>
          <div className="textarea whitespace-pre-wrap flex min-h-[80px] px-4 w-9/10 mx-6 text-center items-center justify-center text-white border rounded-2xl bg-[#374151] overflow-y-auto">
            {profile.introDescription}
          </div>
        </div>
      ) : (
        <div
          className={`flex w-full justify-between ${intro.option === 'option2' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <div className="flex flex-col items-start h-full">
            <div className="w-[244px] h-[160px] px-10 my-10 bg-cover bg-center rounded-full flex items-center justify-center">
              {profile.profileImage ? (
                <img
                  className="w-full h-full rounded-full text-center"
                  src={profile.profileImage}
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full rounded-full text-center flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500">Profile</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={`flex flex-col items-center justify-around ${intro.option === 'option2' ? 'mr-0' : 'mr-10'}`}
          >
            {profile.title ? (
              <div
                className={`flex flex-row w-full ${intro.option === 'option2' ? 'justify-end' : 'justify-start'} font-bold text-2xl mt-10`}
              >
                {profile.title}
              </div>
            ) : (
              <div
                className={`flex flex-row w-full ${intro.option === 'option2' ? 'justify-end' : 'justify-start'} font-bold text-2xl mt-10`}
              >
                {'insert your title'}
              </div>
            )}

            <div
              className={`flex flex-row w-full ${intro.option === 'option2' ? 'justify-end' : 'justify-start'} mt-5`}
            >
              {profile.tagList?.map((tag, index) => (
                <IntroTagList key={index} data={tag} />
              ))}
            </div>
            <textarea
              ref={textareaRef}
              className="w-[400px] h-[100px] min-h-[100px] text-center text-white border rounded-2xl my-10 p-5 bg-[#374151] resize-none overflow-hidden"
              value={profile.introDescription}
              readOnly={true}
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </div>
      )}
=======
    <div className="flex flex-col w-[800px] justify-between bg-white mt-10 rounded-3xl p-10">
      <h1 className="text-3xl font-semibold mr-5">#Introduction</h1>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col items-start h-full mr-15">
            <div className="w-[160px] h-[160px] my-6 mx-6 bg-cover bg-center rounded-full flex items-center justify-center">
              {profile.profileImage ? (
                <img
                  className="w-full h-full rounded-full text-center object-cover"
                  src={profile.profileImage}
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full rounded-full text-center flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500">Profile</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-start w-full py-6 ml-6">
            {profile.title ? (
              <div className="flex flex-row w-full justify-start font-bold text-2xl mt-6">
                {profile.title}
              </div>
            ) : (
              <div className="flex flex-row w-full justify-start font-bold text-zinc-300 text-2xl mt-6">
                {'insert your title'}
              </div>
            )}

            <div className="flex flex-row justify-start w-full mt-5">
              {profile.tagList?.map((tag, index) => (
                <IntroTagList key={index} data={tag} />
              ))}
            </div>
          </div>
        </div>
        <div className="textarea whitespace-pre-wrap flex min-h-[80px] px-4 w-9/10 justify-center mx-6 text-center items-center justify-center text-white border rounded-2xl bg-[#374151] overflow-y-auto">
          {profile.introDescription}
        </div>
      </div>
>>>>>>> develop
    </div>
  );
}
