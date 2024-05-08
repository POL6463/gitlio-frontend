'use client';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface Section {
  id: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  ongoing?: boolean;
}

// Define the state structure
type ExperienceSectionState = {
  sections: Section[];
  addSection: () => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, data: Partial<Section>) => void; // 섹션 업데이트 함수
};

const getSavedSections = () => {
  const savedSections = localStorage.getItem('sections');
  if (savedSections) {
    const parsedSections = JSON.parse(savedSections);
    // 저장된 섹션이 있지만 비어있는 경우, 기본 섹션을 추가
    if (parsedSections.length === 0) {
      const defaultSection = {
        id: '999999', // 고유한 ID 할당
        title: '경력 타이틀을 입력해주세요',
        startDate: '22.03',
        endDate: '24.03',
        description:
          '- 경력의 상세 설명을 입력해주세요 어떤 일을 했고, 어떤걸 담당했는지 설명해주세요 \n - 여러 문장을 입력하실 수 있습니다. \n - + 버튼으로 섹션을 추가할 수 있고, 휴지통 버튼으로 삭제가 가능합니다.',
        ongoing: false,
      };
      return [defaultSection];
    }
    return parsedSections;
  } else {
    // localStorage에 저장된 섹션이 없는 경우, 기본 섹션을 추가
    return [
      {
        id: '999999', // 고유한 ID 할당
        title: '경력 타이틀을 입력해주세요',
        startDate: '22.03',
        endDate: '24.03',
        description:
          '- 경력의 상세 설명을 입력해주세요 어떤 일을 했고, 어떤걸 담당했는지 설명해주세요 \n - 여러 문장을 입력하실 수 있습니다. \n - + 버튼으로 섹션을 추가할 수 있고, 휴지통 버튼으로 삭제가 가능합니다.',
        ongoing: false,
      },
    ];
  }
};

// Function to generate a unique ID
const generateId = () => Math.floor(Math.random() * 10001).toString();

// Define the store
const experienceSectionStore = create<ExperienceSectionState>((set) => ({
  sections: getSavedSections(),
  addSection: () =>
    set((state) => {
      const newSection = {
        id: generateId(),
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        ongoing: false,
      };
      const newSections = [...state.sections, newSection];
      localStorage.setItem('sections', JSON.stringify(newSections));
      return { sections: newSections };
    }),
  removeSection: (id) =>
    set((state) => {
      const filteredSections = state.sections.filter(
        (section) => section.id !== id
      );
      localStorage.setItem('sections', JSON.stringify(filteredSections));
      return { sections: filteredSections };
    }),
  updateSection: (id, data) =>
    set((state) => {
      const updatedSections = state.sections.map((section) =>
        section.id === id ? { ...section, ...data } : section
      );
      localStorage.setItem('sections', JSON.stringify(updatedSections));
      return { sections: updatedSections };
    }),
}));

export default experienceSectionStore;
