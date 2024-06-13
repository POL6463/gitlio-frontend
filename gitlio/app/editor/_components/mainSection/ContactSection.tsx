'use client';
import React from 'react';
import ContactSidebarStore from '@/store/contactSidebarStore';
import useLayoutStore from '@/store/layoutDesignStore';
import ContactOptionOne from './contactLayoutOptions/ContactOptionOne';
import ContactOptionTwo from './contactLayoutOptions/ContactOptionTwo';

export default function ContactSection() {
  const { contactInfo } = ContactSidebarStore();
  const { contact } = useLayoutStore();

  return (
    <div className="bg-white w-[800px] flex flex-col justify-start rounded-xl pb-5">
      <h1 className="text-3xl font-semibold ml-10 mr-5 pt-5">#Contact</h1>
      <div className="flex flex-col items-center h-full w-full mt-5">
        {contact.option === 'option1' && (
          <ContactOptionOne contactInfo={contactInfo} />
        )}
        {contact.option === 'option2' && (
          <ContactOptionTwo contactInfo={contactInfo} />
        )}
      </div>
    </div>
  );
}
