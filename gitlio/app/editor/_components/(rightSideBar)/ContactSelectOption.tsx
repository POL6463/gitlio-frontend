'use clinent';

import React from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';
import { SiTistory, SiVelog } from 'react-icons/si';

interface ContactSelectOptionProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ContactSelectOption({
  onChange,
}: ContactSelectOptionProps) {
  const { contactInfo } = ContactSidebarStore();

  return (
    <div className="flex justify-around w-full">
      <select
        className="select select-bordered select-sm w-1/2 max-w-xs mt-5"
        onChange={onChange}
        value={contactInfo.selectedBlog || ''}
      >
        <option disabled value="" className="font-light">
          choose
        </option>
        <option value="Tistory">Tistory</option>
        <option value="Velog">Velog</option>
      </select>
      {contactInfo.selectedBlog && (
        <div className="flex justify-start items-center w-auto mt-5">
          {
            contactInfo.selectedBlog === 'Tistory' ? (
              <SiTistory className="text-2xl text-orange-500" />
            ) : contactInfo.selectedBlog === 'Velog' ? (
              <SiVelog className="text-2xl text-green-600" />
            ) : null // 비어있는 문자열 대신 null을 사용하여 조건부 렌더링 실행
          }
        </div>
      )}
    </div>
  );
}
