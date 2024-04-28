// store/projectsStore.js
import { create } from 'zustand';

// 프로젝트 데이터 타입 정의
interface Project {
  url: string;
  title: string;
  intro: string;
  images: string[];
  sentences: string[];
}

interface ProjectsState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  updateProject: (updatedProject: Project) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [], // 초기 상태
  setProjects: (projects) => set({ projects }),
  updateProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.url === updatedProject.url ? updatedProject : project
      ),
    })),
}));
