import create from 'zustand';

interface ContactState {
  name: string;
  email: string;
  githubUrl: string;
  selectedBlog?: string; // 블로그 선택 상태 추가
  selectedBlogUrl?: string; //사용자가 기입한 블로그의 url
}

interface ContactStore {
  contactInfo: ContactState;
  setContactInfo: (info: Partial<ContactState>) => void;
  setContactName: (name: string) => void;
  setContactEmail: (email: string) => void;
  setGithubUrl: (githubUrl: string) => void;
  setSelectedBlog: (blog: string) => void;
  setSelectedBlogUrl: (blogUrl?: string) => void;
}

const localStorageKey = 'contact-info-store';

const loadContactInfoFromLocalStorage = (): ContactState => {
  try {
    const storedInfo = localStorage.getItem(localStorageKey);
    if (storedInfo) {
      return JSON.parse(storedInfo);
    }
  } catch (error) {
    console.error(
      '로컬 스토리지로부터 상태를 불러오는 데 실패하였습니다.',
      error
    );
  }

  return {
    name: '',
    email: '',
    githubUrl: '',
    selectedBlog: '',
    selectedBlogUrl: '',
  };
};

const ContactSidebarStore = create<ContactStore>((set) => ({
  contactInfo: loadContactInfoFromLocalStorage(),

  // 전체 ContactInfoState 객체를 업데이트하는 함수
  setContactInfo: (info: Partial<ContactState>) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, ...info } }));
  },

  setContactName: (name: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, name } }));
  },

  setContactEmail: (email: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, email } }));
  },

  setGithubUrl: (githubUrl: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, githubUrl } }));
  },

  setSelectedBlog: (blog?: string) => {
    set((state) => ({
      contactInfo: { ...state.contactInfo, selectedBlog: blog },
    }));
  },
  setSelectedBlogUrl: (blogUrl?: string) => {
    set((state) => ({
      contactInfo: { ...state.contactInfo, selectedBlogUrl: blogUrl },
    }));
  },
}));

ContactSidebarStore.subscribe((state) => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(state.contactInfo));
  } catch (error) {
    console.error('Failed to save state to localStorage', error);
  }
});

export default ContactSidebarStore;
