'use client';
import { MdEmail } from 'react-icons/md';
import { SiTistory, SiVelog, SiGithub } from 'react-icons/si';
import ContactSidebarStore from '@/store/contactSidebarStore';

export default function ContactSection() {
  const { contactInfo } = ContactSidebarStore();

  return (
    <div className="bg-white w-[800px] flex flex-col justify-start rounded-xl pb-5">
      <h1 className="text-3xl font-semibold ml-10 mr-5 pt-5">#Contact</h1>
      <div className="flex flex-col items-center h-full w-full mt-5">
        <div className="flex flex-col justify-evenly items-center w-[600px] h-[300px] p-5 bg-gray-200 rounded-3xl shadow-md">
          <div className="text-left self-start font-semibold mb-5">
            Contact me
          </div>
          {contactInfo.name ? (
            <div className="text-lg font-semibold mb-5">{contactInfo.name}</div>
          ) : (
            <div className="font-bold text-zinc-300 text-xl">
              insert your name
            </div>
          )}
          <div className="w-full flex justify-around items-center">
            <div className="flex justify-between w-auto items-center mb-2">
              <MdEmail className="text-xl mr-2" />
              <div>{contactInfo.email}</div>
            </div>
            <div className="flex justify-between w-auto items-center mb-2">
              <SiTistory className="text-lg text-orange-500 mr-2" />
              <div>{contactInfo.tistoryUrl}</div>
            </div>
          </div>
          <div className="w-full flex justify-around items-center">
            <div className="flex justify-between w-auto items-center mb-2">
              <SiGithub className="text-xl mr-2" />
              <div>{contactInfo.githubUrl}</div>
            </div>
            <div className="flex justify-between w-auto items-center mb-2">
              <SiVelog className="text-lg text-green-600 mr-2" />
              <div>{contactInfo.velogUrl}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center w-[700px] h-[100px] bg-gray-200 rounded-3xl mt-10">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </div>
  );
}
