'use client';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

export default function StdNavbar() {
  const pathname = usePathname();

  const getNavbarText = () => {
    if (pathname.includes('studio/statistics')) {
      return 'Statistics';
    } else if (pathname.includes('studio/posts')) {
      return 'Posts';
    } else if (pathname.includes('studio/settings')) {
      return 'Settings';
    } else if (pathname.includes('studio/dashboard')) {
      return 'Dashboard';
    } else if (pathname.includes('new/editproject')) {
      return 'New Project';
    } else if (pathname.includes('new/showproject')) {
      return 'Your Project';
    } else return 'Unknown Page';
  };

  return (
    <div className="navbar border-b border-gray-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{getNavbarText()}</a>
      </div>
      <SignedOut>
        <SignInButton>
          <FaSignInAlt className="text-white size-6" />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
