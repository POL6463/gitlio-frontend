'use client';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import useSidebarStore from '@/store/sidebarStore';
import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ContactSection from '@/app/editor/_components/mainSection/ContactSection';
import ProjSection from '../_components/mainSection/ProjSection';
import { updateStoresWithPortfolioData } from '@/actions/portfolio';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import useModalStore from '@/store/modalStore';
import ShareModal from '../_components/ShareModal';
import { useUser } from '@clerk/nextjs';
import { fetchPortfolios, fetchUserId } from '@/services/userServices';

interface EditPageProps {
  params: {
    portfolioId: string;
  };
}
export default function EditPage({ params }: EditPageProps) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const { isOpen, closeModal } = useModalStore();
  const router = useRouter();
  const { portfolios, setCurrentPortfolio, currentPortfolio } = useUserStore(
    (state) => ({
      portfolios: state.portfolios,
      setCurrentPortfolio: state.setCurrentPortfolio,
      currentPortfolio: state.currentPortfolio,
    })
  );
  const { portfolioId } = params;

  useEffect(() => {
    // 이 useEffect는 컴포넌트 마운트 시 한 번만 실행됩니다.
    console.log(
      'initializeData 실행 중...' + isSignedIn + user + portfolios.length
    );
    async function initializeData() {
      if (isSignedIn && user && portfolios.length === 0) {
        const fetchedUserId = await fetchUserId(user);
        if (fetchedUserId) {
          await fetchPortfolios();
        }
      }
    }
    initializeData();
  }, [isLoaded]); // isLoaded를 종속성에서 제거

  useEffect(() => {
    // 포트폴리오 상태 감시
    if (portfolios.length > 0) {
      const selectedPortfolio = portfolios.find(
        (p) => p.portfolio_id.toString() === portfolioId
      );
      if (!selectedPortfolio) {
        console.log('포트폴리오를 찾을 수 없습니다.');
        return;
      }
      setCurrentPortfolio(selectedPortfolio);
      (async () => {
        try {
          await updateStoresWithPortfolioData(portfolioId);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to update stores:', error);
          setIsLoading(false);
        }
      })();
    }
  }, [portfolios, portfolioId]); // 포트폴리오 배열과 포트폴리오 ID에 의존

  const setSelectedSection = useSidebarStore(
    (state) => state.setSelectedSection
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div></div>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => setSelectedSection('introduction')}
        className="mb-4 cursor-pointer"
      >
        <IntroSection />
      </div>
      <div
        onClick={() => setSelectedSection('skill')}
        className="mb-4 cursor-pointer"
      >
        <SkillSection />
      </div>
      <div
        onClick={() => setSelectedSection('experience')}
        className="mb-4 cursor-pointer"
      >
        <ExperienceSection />
      </div>
      <div
        onClick={() => setSelectedSection('project')}
        className="mb-4 cursor-pointer"
      >
        <ProjSection isViewMode={false} />
      </div>
      <div
        onClick={() => setSelectedSection('contact')}
        className="mb-4 cursor-pointer"
      >
        <ContactSection />
      </div>
      {/* Other sections can be added here */}
      {isOpen && <ShareModal />}
    </div>
  );
}
