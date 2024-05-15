import Image from 'next/image';
import { FaGlobeAsia } from 'react-icons/fa';
import { LuAlignJustify, LuBarChartBig } from 'react-icons/lu';
import PreviewButton from '@/app/editor/_components/PreviewButton';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { FaSignInAlt } from 'react-icons/fa';
import React from 'react';
import { savePortfolioData } from '@/actions/portfolio';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  function saveData() {
    savePortfolioData({ portfolio_id: '20' }).then((r) => console.log(r));
  }
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/studio/dashboard');
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
        <a className="btn btn-ghost text-lg text-white hover:bg-base-300/20">
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
