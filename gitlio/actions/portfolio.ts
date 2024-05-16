'use client';

import mergeStores from '@/store/mergeStores';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import IntroSidebarStore from '@/store/introSidebarStore';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import experienceSectionStore from '@/store/experienceSectionStore';
import { useProjectsStore } from '@/store/projectStore';
import ContactSidebarStore from '@/store/contactSidebarStore';

const API_URL = 'https://gitlio.fly.dev/api/';
export async function createPortfolio(data: {
  user_id: string;
  title: string;
  domain_name: string;
}) {
  const response = await axios.post(API_URL + 'portfolios/', data, {
    headers: { 'Content-Type': 'application/json' },
  });

  // 스토어의 addPortfolio 메소드 가져오기
  const addPortfolio = useUserStore.getState().addPortfolio;

  // 백엔드에서 받은 데이터를 스토어에 추가
  addPortfolio(response.data);

  console.log('포트폴리오 아이디: ' + response.data.portfolio_id);
  return response.data; // 백엔드에서 전체 포트폴리오 데이터를 반환한다고 가정
}

export async function savePortfolioData(portfolio_id: string) {
  const portfolioData = mergeStores();
  const response = await axios.put(
    API_URL + 'portfolios/' + portfolio_id,
    { portfolio_data: portfolioData },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log('포트폴리오 데이터 저장 결과: ' + JSON.stringify(portfolioData));
  return; // 백엔드에서 저장 결과를 반환한다고 가정
}

export async function getPortfolioData(portfolioId: string) {
  const response = await axios.get(API_URL + 'portfolios/' + portfolioId);
  console.log('포트폴리오 데이터: ' + JSON.stringify(response.data));
  return response.data; // 백엔드에서 포트폴리오 데이터를 반환한다고 가정
}

export async function deletePortfolio(portfolioId: string) {
  const response = await axios.delete(API_URL + 'portfolios/' + portfolioId);
  console.log('포트폴리오 삭제 결과: ' + response.data);
  return response.data; // 백엔드에서 삭제 결과를 반환한다고 가정
}

// Update stores with fetched data
export const updateStoresWithPortfolioData = async (portfolioId: string) => {
  const portfolioData = await getPortfolioData(portfolioId);

  if (!portfolioData) {
    console.error('Failed to fetch portfolio data');
    IntroSidebarStore.setState({
      profile: {
        title: '제목을 입력하세요', // Default empty state for profile
        introDescription: '간략한 설명을 입력하세요',
        profileImage: '',
        tagList: [],
      }, // Default empty state for profile
    });
    useSidebarIconsStore.setState({
      dropAreas: [
        { id: 'default-sidebar', icons: [], title: 'default-sidebar' },
      ], // Default empty state for skill icons
    });
    experienceSectionStore.setState({
      sections: [
        {
          id: '999999', // Assign a unique ID
          title: 'Please enter your job title',
          startDate: '22.03',
          endDate: '24.03',
          description:
            '- Please enter a detailed description of your career, what you did and what you were responsible for.\n- You can enter multiple sentences.\n- You can add sections with the + button, and delete them with the trash can button.',
          ongoing: false,
        },
      ], // Default empty state for experience sections
    });
    useProjectsStore.setState({
      projects: [], // Default empty state for projects
    });
    ContactSidebarStore.setState({
      contactInfo: {
        // Default empty state for contact info
        name: '',
        email: '',
        blogUrls: [],
      },
    });
    return;
  }

  // Assuming `portfolioData` includes sections that correspond to data needed for each store
  IntroSidebarStore.setState({ profile: portfolioData.introData });
  useSidebarIconsStore.setState({ dropAreas: portfolioData.skillData });
  experienceSectionStore.setState({ sections: portfolioData.experienceData });
  useProjectsStore.setState({ projects: portfolioData.projectData });
  ContactSidebarStore.setState({ contactInfo: portfolioData.contactData });
};

export async function uploadImageToS3(
  file: File,
  clerkId: string,
  category: string
) {
  const formData = new FormData();

  // Create an object for the additional data
  const requestData = {
    clerk_id: clerkId,
    category: category,
  };

  // Append the file to formData
  formData.append('image_files', file);

  // Append the JSON string of requestData under the key 'request'
  formData.append('request', JSON.stringify(requestData));

  try {
    const response = await axios.post(
      `${API_URL}images/s3`, // Ensure your environment variable ends without a slash
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('Upload successful:', response.data.data);
    return response.data.data; // Assuming backend returns image URL(s)
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Rethrow or handle error as needed
  }
}
