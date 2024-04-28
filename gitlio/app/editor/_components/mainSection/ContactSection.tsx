'use client';
import { MdEmail } from 'react-icons/md';
import {
  SiTistory,
  SiVelog,
  SiGithub,
  SiInstagram,
  SiFacebook,
  SiKakao,
} from 'react-icons/si';
import ContactSidebarStore from '@/store/contactSidebarStore';

export default function ContactSection() {
  const { contactInfo } = ContactSidebarStore();

  return (
    <div className="bg-white w-[800px] flex flex-col flex-1 justify-start rounded-xl pb-5">
      <h1 className="text-3xl font-semibold ml-10 mr-5 pt-5">#Contact</h1>
      <div className="flex flex-col items-center h-full w-full mt-5">
        <div className="flex flex-col justify-evenly items-center w-[630px] min-h-[300px]  p-5 bg-gray-200 rounded-3xl shadow-md">
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
          <div className="w-full flex justify-evenly items-center">
            <div className="flex justify-start w-[150px] items-center mb-2">
              <MdEmail className="text-xl mr-2 shrink-0" />
              <div className="text-sm font-semibold break-words max-w-[160px]">
                {contactInfo.email}
              </div>
            </div>
            <div className="flex justify-start w-[150px] items-center mb-2">
              <SiTistory className="text-xl text-orange-500 mr-2 shrink-0" />
              <div className="text-sm font-semibold break-words max-w-[160px]">
                {contactInfo.tistoryUrl}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-evenly items-center">
            <div className="flex justify-start w-[150px] items-center mb-2">
              <SiGithub className="text-xl mr-2 shrink-0" />
              <div className="text-sm font-semibold break-words max-w-[160px]">
                {contactInfo.githubUrl}
              </div>
            </div>
            <div className="flex justify-start w-[150px] items-center mb-2">
              <SiVelog className="text-xl text-green-600 mr-2 shrink-0" />
              <div className="text-sm font-semibold break-words max-w-[160px]">
                {contactInfo.velogUrl}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center w-[700px] h-[100px] bg-gray-200 rounded-3xl mt-10">
          <SiInstagram className="text-pink-600 text-3xl hover:text-pink-700 hover:scale-110 transition-transform cursor-pointer" />
          <SiFacebook className="text-blue-600 text-3xl hover:text-blue-700 hover:scale-110 transition-transform cursor-pointer" />
          <SiKakao className="text-yellow-500 text-3xl hover:text-yellow-600 hover:scale-110 transition-transform cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
