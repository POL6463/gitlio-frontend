import { create } from 'zustand';

interface BlogUrl {
  id: string;
  url: string;
  faviconUrl: string;
}

interface ContactState {
  name: string;
  email: string;
  blogUrls: BlogUrl[];
}

interface ContactStore {
  contactInfo: ContactState;
  setContactInfo: (info: Partial<ContactState>) => void;
  setContactName: (name: string) => void;
  setContactEmail: (email: string) => void;
  setBlogUrl: (id: string, url: string) => void;
  addBlogUrl: () => void;
  removeBlogUrl: (id: string) => void;
}

function generateId() {
  return Math.floor(Math.random() * 10001).toString();
}

const ContactSidebarStore = create<ContactStore>((set, get) => ({
  contactInfo: {
    name: '',
    email: '',
    blogUrls: [{ id: '', url: '', faviconUrl: '' }],
  },

  setContactInfo: (info: Partial<ContactState>) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, ...info } }));
  },

  setContactName: (name: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, name } }));
  },

  setContactEmail: (email: string) => {
    set((state) => ({ contactInfo: { ...state.contactInfo, email } }));
  },

  setBlogUrl: (id: string, url: string) => {
    set((state) => {
      const newBlogUrls = state.contactInfo.blogUrls.map((blog) => {
        if (blog.id === id) {
          let faviconUrl = '';
          if (url) {
            // Ensure URL is not empty before trying to set favicon
            try {
              faviconUrl = new URL(url).origin + '/favicon.ico';
            } catch (error) {
              console.error('Invalid URL format', error);
              faviconUrl = ''; // If URL is invalid, reset favicon URL
            }
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
      const filteredBlogUrls = state.contactInfo.blogUrls.filter(
        (url) => url.id !== id
      );
      return {
        contactInfo: {
          ...state.contactInfo,
          blogUrls: filteredBlogUrls,
        },
      };
    });
  },
}));

export default ContactSidebarStore;
