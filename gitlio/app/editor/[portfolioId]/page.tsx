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

interface EditPageProps {
  params: {
    portfolioId: string;
  };
}
export default function EditPage({ params }: EditPageProps) {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const { isOpen, closeModal } = useModalStore();
  const router = useRouter();
  const { portfolios, setCurrentPortfolio } = useUserStore((state) => ({
    portfolios: state.portfolios,
    setCurrentPortfolio: state.setCurrentPortfolio,
  }));
  const { portfolioId } = params;

  console.log(params);
  useEffect(() => {
    const fetchPortfolioData = async () => {
      const portfolio = portfolios.find(
        (portfolio) => portfolio.portfolio_id.toString() === portfolioId
      );

      if (!portfolio) {
        router.push('/error'); // Redirect to an error page if the portfolio ID is not found
        return;
      }
      //일치하는 포트폴리오 찾았으면 현재 포트폴리오로 세팅
      setCurrentPortfolio(portfolio);

      try {
        await updateStoresWithPortfolioData(portfolioId);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to update stores:', error);
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [portfolioId, portfolios, router, setCurrentPortfolio]);

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
