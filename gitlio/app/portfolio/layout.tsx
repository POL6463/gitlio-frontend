// EditorLayout.tsx
'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import TopBlogBar from '@/app/editor/_components/TopBlogBar';

const EditorLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
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
        <div className="flex-none gap-6 pr-4">
          {isClient && (
            <>
              <SignedOut>
                <SignInButton>
                  <FaSignInAlt className="text-white size-6" />
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </div>
      </div>
      <div className="flex-grow flex overflow-hidden">
        <TopBlogBar />
        <div className="flex flex-col flex-grow mt-24 overflow-auto justify-center items-center">
          <div className="flex mb-16">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
