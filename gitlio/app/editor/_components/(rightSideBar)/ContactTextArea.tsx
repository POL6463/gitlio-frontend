'use client';

import React from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';

interface ContactTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export default function ContactTextArea({
  value,
  onChange,
  onKeyDown,
}: ContactTextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Message"
      className="input-md w-full h-full bg-neutral-200 rounded-xl resize-none overflow-hidden mt-2"
      style={{ paddingTop: '0.5rem' }}
    ></textarea>
  );
}
