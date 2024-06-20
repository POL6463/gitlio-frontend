'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import PortfolioComponent from '@/components/PortfolioComponent';
import { useRouter } from 'next/navigation';
import PortfolioSkeleton from '@/components/PortfolioSkeleton';
import { fetchPortfolios, fetchUserId } from '@/services/userServices';

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  if (isLoaded && !isSignedIn) {
    router.push('/');
  }

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserId(user).then((fetchedUserId) => {
        if (fetchedUserId) {
          fetchPortfolios().finally(() => {
            setLoading(false);
          });
        }
      });
    }
  }, [isLoaded]);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="flex-1 p-4">
      <PortfolioComponent />
    </div>
  );
}
