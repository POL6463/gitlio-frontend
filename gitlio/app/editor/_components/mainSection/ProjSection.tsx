'use client';
import React, { useState } from 'react';
import { useProjectsStore } from '@/store/projectStore';
import ProjBox from './projComponents/ProjBox';
import { Data } from '@/app/editor/(interface)/ProjectData';
import ProjEditModal from './projComponents/ProjEditModal';

const sampleData: Data[] = [
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
  },
  {
    url: 'https://github.com/SV-Summer-BootCamp-Team-F',
    title: 'Remember Plus',
    intro: '당신의 명함을 밤하늘의 별자리로',
    images: [
      'https://i.ibb.co/jV9W28Y/2024-03-12-1-46-15.png',
      'https://i.ibb.co/p0WvXfx/2024-03-12-1-45-12.png',
      'https://i.ibb.co/2cRgbZs/2024-03-12-1-44-33.png',
    ],
    sentences: [
      '한눈에 보기 편한 UI/UX',
      '차트를 통한 분석 ⇒ 나만의 관계 데이터 관리',
      'D3.js의 zoom 이벤트 핸들러에 transform 속성을 사용하고, 내부에 그래프 렌더링을 통해 복잡한 Network 그래프 구현',
      '프론트엔드 개발 효율을 높이기 위해 퍼블리싱 이후 MSW를 이용한 API Mocking',
    ],
  },
  {
    url: 'https://github.com/Fashion-Cloud',
    title: 'Fashion Cloud',
    intro: '날씨별 패션 공유 플랫폼',
    images: [
      'https://i.ibb.co/KKSKMnc/2024-03-12-2-11-35.png',
      'https://i.ibb.co/vd9Gr8Z/2024-03-12-2-11-52.png',
      'https://i.ibb.co/s64tzfn/2024-03-12-2-12-06.png',
      'https://i.ibb.co/X4MP1QY/2024-03-12-2-12-17.png',
      'https://i.ibb.co/TY0zY8R/2024-03-12-2-12-28.png',
      'https://i.ibb.co/8rYWrh8/2024-03-12-2-10-57.png',
    ],
    sentences: [
      'Spring Security를 이용한 로그인 기능 구현',
      'Next.js로의 마이그레이션, 상태관리 라이브러리 변경',
      '조회수 기능에 Look Aside + Write back 캐싱 적용',
      'key구성 변경, 단위 분리하기',
    ],
  },
  {
    url: 'https://github.com/AI-ary',
    title: 'AI-ary',
    intro: '어른들의 동심을 찾아라!',
    images: [
      'https://i.ibb.co/NsZHfhd/ai1.png',
      'https://i.ibb.co/VqQbDdH/ai2.gif',
      'https://i.ibb.co/4tbTPFD/ai3.gif',
      'https://i.ibb.co/mCQRd9x/ai4.gif',
      'https://i.ibb.co/cJ0jFT8/ai5.gif',
      'https://i.ibb.co/N3W1ZH7/ai6.gif',
    ],
    sentences: [
      'Spring Boot를 이용한 REST API구현',
      'Spring Boot JPA를 이용하여 반복 작업을 최소화하고 성능 최적화',
      '그림일기 이미지 파일 AWS S3업로드 및 이미지 URL반환 로직 구현',
      'Flask를 이용하여 Dall-E3와 KoNLPy컨트롤러 구현',
      'Nginx를 통해 정적 파일 서빙 및 프록시 설정을 통해 서버와 클라이언트 연결 관리',
    ],
  },
  {
    url: 'https://github.com/2023-Summer-Bootcamp-Team-K',
    title: 'Fit-A-Pet',
    intro: '반려 동물의 혈당 데이터를 통한 맞춤형 사료 추천 시스템',
    images: [
      'https://camo.githubusercontent.com/5b87fc3e1575b119fb5629fd3b3f19d89ffb77180c381f35f5d3928595b03145/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3534382f302a674251307755504379563830655f72362e676966',
      'https://camo.githubusercontent.com/1ef53a05c3ff26f60d5a9c84adf95c5a4dd16d89c13113bc9b673fb1713760bd/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3534382f312a5f6d5f72336236475a795a6f4e59635f534c654a6a672e676966',
      'https://camo.githubusercontent.com/d26fa8fddbfb6927166b403a7f05a9a086ddb1a125659ac25573a8b03bfd35c6/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3534382f312a4f6d70656b5041584767435252395f455853564132412e676966',
      'https://camo.githubusercontent.com/5d9f707e735e69f37e0752b2e48d1c8647c7f65e70ef9f856e89d68bad77aad3/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3534382f302a734a414d5437524c6c54424f543746542e676966',
    ],
    sentences: [
      'Spring Boot를 이용한 REST API구현',
      'Spring Boot JPA를 이용하여 반복 작업을 최소화하고 성능 최적화',
      '그림일기 이미지 파일 AWS S3업로드 및 이미지 URL반환 로직 구현',
      'Flask를 이용하여 Dall-E3와 KoNLPy컨트롤러 구현',
      'Nginx를 통해 정적 파일 서빙 및 프록시 설정을 통해 서버와 클라이언트 연결 관리',
    ],
  },
  {
    url: 'https://github.com/2023-Winter-Bootcamp-TeamH',
    title: 'BuySelf',
    intro: '무인 상품 인식 계산대',
    images: [
      'https://user-images.githubusercontent.com/77673029/215676052-3c6b8760-c5c6-4ce5-8553-5668a4953f12.png',
      'https://user-images.githubusercontent.com/77673029/215985324-8363c936-91e4-4b92-8342-9ac5d6850523.gif',
      'https://user-images.githubusercontent.com/77673029/215985726-26946a60-1cab-481d-95fd-e7f83e85f630.gif',
      'https://user-images.githubusercontent.com/77673029/215986341-cfe8f19c-25c2-419f-99a0-b78afaaa8d2e.gif',
    ],
    sentences: [
      'AI의 처리 시간 증가로인한 사용자 경험이 방해되지 않도록 RabbitMQ와 Celery를 통해 AI 결과를 비동기적으로 처리',
      '사용자가 많이 호출하는 API에 의해 서버 과부하가 발생했고, 서버 부하와 응답시간을 줄이기 위해 Redis를 이용하여 Caching',
      '사용자가 제공하는 이미지로 상품 인식 후 pandas를 사용하여 AI 분석 결과를 반환하는 API',
    ],
  },
];

export default function ProjSection() {
  const { projects, setProjects } = useProjectsStore();
  const [isEditProjModalOpen, setIsEditProjModalOpen] = React.useState(false);
  const [projectsData, setProjectsData] = useState<Data[]>(sampleData); // 프로젝트 데이터 상태 관리
  const [selectedRadio, setSelectedRadio] = React.useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  React.useEffect(() => {
    setProjects(sampleData); // 초기 프로젝트 데이터 로드
  }, [setProjects]);

  const handleToggleModal = () => {
    setIsEditProjModalOpen(!isEditProjModalOpen);
  };

  const handleSaveData = (newData: Data[]) => {
    setProjectsData(newData);
    setIsEditProjModalOpen(false); // 데이터 저장 후 모달창 닫기
  };

  const handleRadioChange = (index: number) => {
    setSelectedRadio(index);
  };

  const goToNextImage = () => {
    // 다음 프로젝트를 보여줍니다. 마지막 프로젝트에서는 첫 번째 프로젝트로 돌아갑니다.
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPreviousImage = () => {
    // 이전 프로젝트를 보여줍니다. 첫 번째 프로젝트에서는 마지막 프로젝트로 갑니다.
    setCurrentProjectIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  return (
    <div className="bg-white m-8 rounded-3xl">
      <br />
      <div className="flex items-center -mb-3">
        <h1 className="text-3xl font-semibold ml-10 mr-5">#Project</h1>
        <div className="btn" onClick={handleToggleModal}>
          편집
        </div>
        <div className="ml-5">
          {[0, 1].map((index) => (
            <input
              key={index}
              type="radio"
              name="radio-1"
              className="radio mr-2 mt-2"
              checked={selectedRadio === index}
              onChange={() => setSelectedRadio(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {selectedRadio === 0 && (
          <div className="flex flex-col items-center">
            {projects.map((data, index) => (
              <ProjBox key={index} data={data} />
            ))}
          </div>
        )}
        {selectedRadio === 1 && (
          <div className="relative">
            <ProjBox data={projects[currentProjectIndex]} />
            <button
              onClick={goToPreviousImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={goToNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      {isEditProjModalOpen && (
        <ProjEditModal
          onClose={() => setIsEditProjModalOpen(false)}
          data={projectsData}
          onSave={handleSaveData}
        />
      )}
    </div>
  );
}
