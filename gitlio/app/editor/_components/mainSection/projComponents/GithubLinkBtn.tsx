// 'use client';
import React from 'react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

interface GithubLinkButtonProps {
  url: string;
}

const GithubLinkButton: React.FC<GithubLinkButtonProps> = ({ url }) => {
  return (
    <Link href={url} rel="noopener noreferrer" target="_blank">
      <div className="btn self-end inline-flex items-center">
        <FaGithub className="w-6 h-6" />
        <p className="text-sm ml-2">자세히 보러가기</p>
      </div>
    </Link>
  );
};

export default GithubLinkButton;
