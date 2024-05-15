'use client';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import useSidebarStore from '@/store/sidebarStore';
import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ContactSection from '@/app/editor/_components/mainSection/ContactSection';
import ProjSection from '../_components/mainSection/ProjSection';
import { useRouter, usePathname } from 'next/navigation';
import { updateStoresWithPortfolioData } from '@/actions/portfolio';
import { useEffect, useState } from 'react';

export default function EditPage({
  params,
}: {
  params: { portfolioDomain: string };
}) {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  console.log(params);
  useEffect(() => {
    if (!params.portfolioDomain) return; // Guard clause if the portfolioDomain is not available

    // Call to update data
    updateStoresWithPortfolioData(params.portfolioDomain.toString())
      .then(() => {
        setIsLoading(false); // Set loading to false when data fetching is complete
      })
      .catch((error) => {
        console.error('Failed to update stores:', error);
        setIsLoading(false); // Ensure loading is set to false even if there is an error
      });
  }, []);
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
        onClick={() => setSelectedSection('information')}
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
      <div className="mb-4 cursor-pointer">
        <ProjSection />
      </div>
      <div
        onClick={() => setSelectedSection('contact')}
        className="mb-4 cursor-pointer"
      >
        <ContactSection />
      </div>
      {/* Other sections can be added here */}
    </div>
  );
}
