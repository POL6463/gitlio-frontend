'use client';
import StdNavbar from '@/components/studio/StdNavbar';
import Sidebar from '@/components/studio/StdSidebar';
import { useUser } from '@clerk/nextjs';
import { useUserStore } from '@/store/userStore';
import { useEffect, useRef } from 'react';
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
  const isRequesting = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && user.id && !userId && !isRequesting.current) {
      isRequesting.current = true; // 요청 시작
      const data = {
        clerk_id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      };

      getIdAfterLogin(data)
        .then((fetchedUserId) => {
          if (!userId) {
            setUserId(fetchedUserId);
          }
          isRequesting.current = false; // 요청 완료
        })
        .catch((err) => {
          console.error('Failed to fetch userId:', err);
          isRequesting.current = false; // 요청 실패
        });
    }
  }, [isSignedIn, user, userId]);

  useEffect(() => {
    if (userId) {
      getUserPortfolios(userId.toString())
        .then((portfolios) => {
          if (Array.isArray(portfolios)) {
            setPortfolios(portfolios);
          } else {
            console.error(
              'Expected an array of portfolios, received:',
              portfolios
            );
            setPortfolios([]); // Set to empty array if not array
          }
        })
        .catch((err) => {
          console.error('Failed to fetch portfolios:', err);
          setPortfolios([]); // Ensure portfolios is always an array
        });
    }
  }, [userId, setPortfolios]);
  return (
    <div className="flex-1 p-4">
      메인 컨텐츠 영역
      <PortfolioComponent />
    </div>
  );
}
