import create from 'zustand';

interface BlogUrl {
  id: string;
  url: string;
  faviconUrl: string;
}

interface ContactState {
  name: string;
  email: string;
  githubUrl: string;
  blogUrls: BlogUrl[]; //사용자가 기입한 블로그의 url
}

interface ContactStore {
  contactInfo: ContactState;
  setContactInfo: (info: Partial<ContactState>) => void;
  setContactName: (name: string) => void;
  setContactEmail: (email: string) => void;
  setGithubUrl: (githubUrl: string) => void;
  setBlogUrl: (id: string, url: string) => void;
  addBlogUrl: () => void;
  removeBlogUrl: (id: string) => void;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const localStorageKey = 'contact-info-store';

const loadContactInfoFromLocalStorage = (): ContactState => {
  try {
    const storedInfo = localStorage.getItem(localStorageKey);
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      // 블로그 URL 배열이 적어도 하나의 빈 객체를 포함하도록 보장
      parsedInfo.blogUrls =
        parsedInfo.blogUrls && parsedInfo.blogUrls.length > 0
          ? parsedInfo.blogUrls
          : [{ url: '', faviconUrl: '' }];
      return parsedInfo;
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
    blogUrls: [{ id: '', url: '', faviconUrl: '' }],
  };
};

const ContactSidebarStore = create<ContactStore>((set, get) => ({
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

  setContactMessage: (contactMessage: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, contactMessage } }));
  },

  setGithubUrl: (githubUrl: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, githubUrl } }));
  },

  setBlogUrl: (id: string, url: string) => {
    set((state) => {
      const newBlogUrls = state.contactInfo.blogUrls.map((blog) => {
        if (blog.id === id) {
          let faviconUrl = '';
          try {
            faviconUrl = new URL(url).origin + '/favicon.ico';
          } catch (error) {
            console.error('Invalid URL format', error);
          }
          return { ...blog, url, faviconUrl };
        }
        return blog;
      });
      return { contactInfo: { ...state.contactInfo, blogUrls: newBlogUrls } };
    });
  },

  addBlogUrl: () => {
    set((state) => {
      if (state.contactInfo.blogUrls.length < 3) {
        const newBlogUrls = [
          ...state.contactInfo.blogUrls,
          { id: generateId(), url: '', faviconUrl: '' },
        ];
        return {
          contactInfo: {
            ...state.contactInfo,
            blogUrls: newBlogUrls,
          },
        };
      }
      return state;
    });
  },

  removeBlogUrl: (id: string) => {
    set((state) => {
      if (state.contactInfo.blogUrls.length > 1) {
        const filteredBlogUrls = state.contactInfo.blogUrls.filter(
          (url) => url.id !== id
        );
        return {
          contactInfo: {
            ...state.contactInfo,
            blogUrls: filteredBlogUrls,
          },
        };
      }
      return state;
    });
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
