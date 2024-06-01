'use client';

import mergeStores from '@/store/mergeStores';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import IntroSidebarStore from '@/store/introSidebarStore';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import experienceSectionStore from '@/store/experienceSectionStore';
import { useProjectsStore } from '@/store/projectStore';
import ContactSidebarStore from '@/store/contactSidebarStore';
import useLayoutStore from '@/store/layoutDesignStore';

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
        { id: 'area-2', icons: [], title: 'Language' },
        { id: 'area-3', icons: [], title: 'Framework' },
      ], // Default empty state for skill icons
    });
    experienceSectionStore.setState({
      sections: [
        {
          id: '999999', // Assign a unique ID
          title: '경력, 포지션을 입력해 주세요',
          startDate: '22.03',
          endDate: '24.03',
          description:
            '- 경력, 수행한 업무 및 담당 업무에 대한 자세한 설명을 입력하세요.\n- 여러 문장을 입력할 수 있습니다.\n- + 버튼으로 섹션을 추가하고 휴지통 버튼으로 삭제할 수 있습니다.',
          ongoing: false,
        },
      ], // Default empty state for experience sections
    });
    useProjectsStore.setState({
      projects: [
        {
          url: 'https://github.com/2023-WinterBootcamp-Team-M',
          title: 'ClipTab',
          intro: '똑똑한 북마크 익스텐션',
          images: [
            'https://i.ibb.co/NTd8vTG/2024-03-12-1-23-06.png',
            'https://i.ibb.co/GWdLNnC/2024-03-12-2-05-32.png',
            'https://i.ibb.co/sybwTHR/2024-03-12-2-07-23.png',
          ],
          sentences: [
            '만약 자동 분류 북마크 생성을 선택했다면 카테고리도 gpt로 자동 분류되어 저장',
            'celery beat로 스케쥴링 된 task 실행',
            '이미지(url)를 클립보드에 저장하고 drag&drop, download 등으로 활용',
            '새로 url을 넣으면 정해진 갯수를 넘어가는 데이터는 Queue 형식으로 자동 삭제 ',
          ],
          serviceUrl: 'https://example.com/api',
        },
      ], // Default empty state for projects
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

  const layoutStore = useLayoutStore.getState();
  if (portfolioData.layoutData) {
    layoutStore.intro.setOption(portfolioData.layoutData.introOption);
    layoutStore.skill.setColor(portfolioData.layoutData.skillColor);
    layoutStore.experience.setOption(portfolioData.layoutData.experienceOption);
    layoutStore.contact.setOption(portfolioData.layoutData.contactOption);
  }
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
