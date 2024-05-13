'use client';
import React, { useState } from 'react';
// ModalButton.js

import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import ProjSection from './mainSection/ProjSection';
import ContactSection from './mainSection/ContactSection';
import { MdPreview } from 'react-icons/md';
import { FaGlobeAsia } from 'react-icons/fa';
import TopBlogBar from '@/app/editor/_components/TopBlogBar';
import usePreviewStore from '@/store/previewStore'; // Assuming the path to your Zustand store

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const setPreview = usePreviewStore((state) => state.setPreview);

  const openModal = (): void => {
    setIsModalOpen(true);
    setPreview(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setPreview(false);
  };

  return (
    <>
      <a
        className="btn btn-ghost text-lg text-white hover:bg-base-300/20"
        onClick={openModal}
      >
        <MdPreview className="text-white size-6" />
        미리보기
      </a>
      {isModalOpen && (
        <dialog open className="modal" aria-labelledby="modal-title">
          <div className="modal-box max-w-full max-h-full bg-base-200">
            <form method="dialog">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <h3 id="modal-title" className="font-bold text-lg">
              Preview
            </h3>
            <TopBlogBar />
            <div className="flex flex-col gap-4 items-center">
              <IntroSection />
              <SkillSection />
              <ExperienceSection />
              <ProjSection />
              <ContactSection />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ModalButton;
