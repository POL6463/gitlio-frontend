import { create } from 'zustand';

export interface Section {
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
  updateSection: (id: string, data: Partial<Section>) => void; // Update a section
};

// Function to generate a unique ID
const generateId = () => Math.floor(Math.random() * 10001).toString();

// Define the store
const experienceSectionStore = create<ExperienceSectionState>((set) => ({
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
  ],
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
      return { sections: [...state.sections, newSection] };
    }),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
  updateSection: (id, data) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, ...data } : section
      ),
    })),
}));

export default experienceSectionStore;
