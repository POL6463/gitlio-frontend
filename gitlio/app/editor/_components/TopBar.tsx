'use client';

import Image from 'next/image';
import { FaGlobeAsia } from 'react-icons/fa';
import { LuAlignJustify, LuBarChartBig } from 'react-icons/lu';
import PreviewButton from '@/app/editor/_components/PreviewButton';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { FaSignInAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import { savePortfolioData } from '@/actions/portfolio';
import { useRouter, usePathname } from 'next/navigation';
<<<<<<< HEAD
import useModalStore from '@/store/modalStore';

export default function TopBar() {
  const pathname = usePathname().split('/').filter(Boolean).pop();
  const { openModal } = useModalStore();

  function saveData() {
    if (!pathname) return;
    savePortfolioData(pathname).then((r) => console.log(r));
  }
=======
import useToastStore from '@/store/toastStore';

export default function TopBar() {
  const pathname = usePathname().split('/').filter(Boolean).pop();

>>>>>>> develop
  const router = useRouter();
  const setShowToast = useToastStore((state) => state.setShowToast);
  const saveData = () => {
    if (!pathname) return;
    savePortfolioData(pathname)
      .then((r) => {
        console.log(r);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      })
      .catch((error: any) => console.error('Error saving data:', error));
  };

  const handleLogoClick = (): void => {
    router.push('/studio/dashboard');
  };

  const handleShareClick = (): void => {
    openModal();
  };

  return (
    <div className="navbar bg-neutral-800 fixed top-0 left-0 right-0 z-10">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl text-white hover:bg-base-300/20"
          onClick={handleLogoClick}
        >
          <Image
            src={'/logo_white_lg.svg'}
            alt={'whiteLogo'}
            width={30}
            height={30}
          />
          GITLIO
        </a>
      </div>
      <div className="flex-none gap-6">
        <a
          className="btn btn-ghost text-lg text-white hover:bg-base-300/20"
          onClick={handleShareClick}
        >
          <FaGlobeAsia className="text-white size-6" />
          공유
        </a>
        <PreviewButton />
        <button className="btn" onClick={saveData}>
          <div className="mx-2 text-lg text">저장</div>
        </button>
        <button className="btn btn-square btn-ghost">
          <LuBarChartBig className="text-white size-6" />
        </button>
        <button className="btn btn-square btn-ghost">
          <LuAlignJustify className="text-white size-6" />
        </button>
        <SignedOut>
          <SignInButton>
            <FaSignInAlt className="text-white size-6" />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
