'use client';
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import LoginModal from '@/components/start/LoginModal';
import SignInModal from '@/components/start/SignInModal';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const StartPage: React.FC = () => {
  return (
    <div className="bg-primary flex justify-center items-center h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2 absolute top-0 w-full">
        <Logo />
        <SignedOut>
          <SignInButton
            forceRedirectUrl="/studio/dashboard"
            fallbackRedirectUrl="/studio/dashboard"
          />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>{' '}
      <div className="bg-primary flex flex-col justify-center items-center h-screen">
        <Link
          href="/studio/dashboard"
          className="btn btn-ghost text-xl text-[#8288a1] underline underline-offset-4"
        >
          DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
