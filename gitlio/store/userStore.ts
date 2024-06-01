import { create } from 'zustand';
import { deletePortfolio } from '@/actions/portfolio';

export interface Portfolio {
  created_at: string;
  deployed: boolean;
  domain_name: string;
  mongo_id: string;
  portfolio_id: number;
  title: string;
  updated_at: string | null;
}

interface UserState {
  userId: number | null;
  clerkId: string;
  email: string;
  name: string | null;
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null; // 현재 선택된 포트폴리오를 저장하는 상태
  setUser: (
    user: Omit<UserState, 'userId' | 'portfolios' | 'currentPortfolio'>
  ) => void;
  setUserId: (userId: number) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolioId: number) => void;
  updatePortfolio: (portfolio: Portfolio) => void;
  setPortfolios: (portfolios: Portfolio[]) => void;
  setCurrentPortfolio: (portfolio: Portfolio | null) => void; // 선택된 포트폴리오를 설정하는 함수
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  clerkId: '',
  email: '',
  name: null,
  portfolios: [],
  currentPortfolio: null, // 초기 상태는 null
  setUser: (user) => set({ ...user }),
  setUserId: (userId) => set({ userId }),
  addPortfolio: (portfolio) =>
    set((state) => ({
      portfolios: [...state.portfolios, portfolio],
    })),
  removePortfolio: async (portfolioId) => {
    try {
      await deletePortfolio(portfolioId.toString());
      set((state) => ({
        portfolios: state.portfolios.filter(
          (portfolio) => portfolio.portfolio_id !== portfolioId
        ),
      }));
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
    }
  },
  updatePortfolio: (updatedPortfolio) =>
    set((state) => ({
      portfolios: state.portfolios.map((portfolio) =>
        portfolio.portfolio_id === updatedPortfolio.portfolio_id
          ? updatedPortfolio
          : portfolio
      ),
    })),
  setPortfolios: (portfolios) => set({ portfolios }),
  setCurrentPortfolio: (portfolio) => set({ currentPortfolio: portfolio }), // 현재 포트폴리오 설정
}));
