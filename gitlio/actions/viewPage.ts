'use client';
import axios from 'axios';
import IntroSidebarStore from '@/store/introSidebarStore';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import experienceSectionStore from '@/store/experienceSectionStore';
import { useProjectsStore } from '@/store/projectStore';
import ContactSidebarStore from '@/store/contactSidebarStore';

const API_URL = 'https://gitlio.fly.dev/api/';

export async function getPortfolioDataByDomain(domainName: string) {
  const response = await axios.get(API_URL + 'portfolios/domain/' + domainName);
  return response.data; // 백엔드에서 포트폴리오 데이터를 반환한다고 가정
}

export const updateStoresWithPortfolioData = async (domainName: string) => {
  const portfolioData = await getPortfolioDataByDomain(domainName);

  console.log('Fetched portfolio data:', portfolioData);

  if (!portfolioData) {
    console.error('Failed to fetch portfolio data');

    return;
  }

  // Assuming `portfolioData` includes sections that correspond to data needed for each store
  IntroSidebarStore.setState({ profile: portfolioData.introData });
  useSidebarIconsStore.setState({ dropAreas: portfolioData.skillData });
  experienceSectionStore.setState({ sections: portfolioData.experienceData });
  useProjectsStore.setState({ projects: portfolioData.projectData });
  ContactSidebarStore.setState({ contactInfo: portfolioData.contactData });
};
