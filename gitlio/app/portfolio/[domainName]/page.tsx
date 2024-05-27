'use client';
import React, { useEffect, useState } from 'react';
import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import ProjSection from '@/app/editor/_components/mainSection/ProjSection';
import ContactSection from '@/app/editor/_components/mainSection/ContactSection';
import { updateStoresWithPortfolioData } from '@/actions/viewPage';
import { useRouter } from 'next/navigation';

export default function PortfolioPage({
  params,
}: {
  params: { domainName: string };
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching portfolio data for domain:', params.domainName);
        await updateStoresWithPortfolioData(params.domainName);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch portfolio data, redirecting...');
        router.push('/error'); // 에러 발생 시 리다이렉션
      }
    };

    fetchData();
  }, [params.domainName]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <IntroSection />
      <SkillSection />
      <ExperienceSection />
      <ProjSection isViewMode={true} />
      <ContactSection />
    </div>
  );
}
