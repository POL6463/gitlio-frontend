'use client';
import React, { useState } from 'react';
// ModalButton.js

import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import ProjSection from './mainSection/ProjSection';
import ContactSection from './mainSection/ContactSection';

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="btn text-lg" onClick={openModal}>
        미리보기
      </button>
      {isModalOpen && (
        <dialog open className="modal" aria-labelledby="modal-title">
          <div className="modal-box w-full max-w-full max-h-full h-full bg-base-200">
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
