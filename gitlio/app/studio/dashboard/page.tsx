'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserStore } from '@/store/userStore';
import { getIdAfterLogin, getUserPortfolios } from '@/actions/user';
import PortfolioComponent from '@/components/PortfolioComponent';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const { setUser, setUserId, setPortfolios } = useUserStore((state) => ({
    setUser: state.setUser,
    setUserId: state.setUserId,
    setPortfolios: state.setPortfolios,
  }));
  const userId = useUserStore((state) => state.userId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user && user.id && !userId) {
      getIdAfterLogin({
        clerk_id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      })
        .then((fetchedUserId) => {
          setUserId(fetchedUserId);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch userId:', err);
          setLoading(false);
        });
    } else if (userId) {
      getUserPortfolios(userId.toString())
        .then((portfolios) => {
          if (Array.isArray(portfolios)) {
            setPortfolios(portfolios);
          } else {
            console.error(
              'Expected an array of portfolios, received:',
              portfolios
            );
            setPortfolios([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch portfolios:', err);
          setLoading(false);
        });
    }
  }, [isSignedIn, user, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-4">
      <PortfolioComponent />
    </div>
  );
}
