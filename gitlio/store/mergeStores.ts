import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import IntroSidebarStore from '@/store/introSidebarStore';
import experienceSectionStore from '@/store/experienceSectionStore';
import { useProjectsStore } from '@/store/projectStore';
import ContactSidebarStore from '@/store/contactSidebarStore';

const mergeStores = () => {
  const sidebarIconsState = useSidebarIconsStore.getState();
  const introSidebarState = IntroSidebarStore.getState();
  const experienceSectionState = experienceSectionStore.getState();
  const projectSectionState = useProjectsStore.getState();
  const contactSidebarState = ContactSidebarStore.getState();

  return {
    introData: introSidebarState.profile,
    skillData: sidebarIconsState.dropAreas,
    experienceData: experienceSectionState.sections,
    projectData: projectSectionState.projects,
    contactData: contactSidebarState.contactInfo,
  };
};

export default mergeStores;
