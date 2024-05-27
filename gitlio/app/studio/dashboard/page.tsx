'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserStore } from '@/store/userStore';
import { getIdAfterLogin, getUserPortfolios } from '@/actions/user';
import PortfolioComponent from '@/components/PortfolioComponent';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const { setUser, setUserId, setPortfolios } = useUserStore((state) => ({
    setUser: state.setUser,
    setUserId: state.setUserId,
    setPortfolios: state.setPortfolios,
  }));
  const userId = useUserStore((state) => state.userId);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  if (!isSignedIn) {
    router.push('/');
  }

  useEffect(() => {
    // 사용자 ID를 가져오는 과정
    const fetchUserId = async () => {
      if (user && user.id && !userId) {
        try {
          const fetchedUserId: number = await getIdAfterLogin({
            clerk_id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            name: user.fullName,
          });
          setUserId(fetchedUserId);
          return fetchedUserId; // 다음 단계에서 사용할 수 있도록 fetchedUserId를 반환합니다.
        } catch (err) {
          console.error('Failed to fetch userId:', err);
        }
      }
      return null;
    };

    // 포트폴리오 목록을 가져오는 과정
    const fetchPortfolios = async (id: null | number) => {
      if (!id) return; // userId가 없다면 실행하지 않음
      try {
        const portfolios = await getUserPortfolios(id.toString());
        if (Array.isArray(portfolios)) {
          setPortfolios(portfolios);
        } else {
          console.error(
            'Expected an array of portfolios, received:',
            portfolios
          );
          setPortfolios([]);
        }
      } catch (err) {
        console.error('Failed to fetch portfolios:', err);
      }
    };

    if (isSignedIn) {
      fetchUserId().then((fetchedUserId) => {
        // UserID를 성공적으로 가져왔다면, 포트폴리오를 불러옴
        fetchPortfolios(fetchedUserId || userId);
      });
    }
  }, [isSignedIn, user, userId]); // 의존성 배열을 최적화하여 필요한 변수들만 포함시킴

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-4">
      <PortfolioComponent />
    </div>
  );
}
