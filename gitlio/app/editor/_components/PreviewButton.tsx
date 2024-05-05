// ModalButton.js

import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';

const ModalButton = () => {
  return (
    <>
      <button
        className="btn text-lg"
        onClick={() => {
          return document.getElementById('my_modal_3').showModal();
        }}
      >
        미리보기
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-full max-h-full h-full bg-base-200">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Preview</h3>
          <div className="flex flex-col gap-4 items-center">
            <IntroSection />
            <SkillSection />
            <ExperienceSection />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalButton;
