// store/userStore.ts
import { create } from 'zustand';

interface Portfolio {
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
  setUser: (user: Omit<UserState, 'userId' | 'portfolios'>) => void;
  setUserId: (userId: number) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolioId: number) => void;
  updatePortfolio: (portfolio: Portfolio) => void;
  setPortfolios: (portfolios: Portfolio[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  clerkId: '',
  email: '',
  name: null,
  portfolios: [],
  setUser: (user) => set({ ...user }),
  setUserId: (userId) => set({ userId }),
  addPortfolio: (portfolio) =>
    set((state) => ({
      portfolios: [...state.portfolios, portfolio],
    })),
  removePortfolio: (portfolioId) =>
    set((state) => ({
      portfolios: state.portfolios.filter(
        (portfolio) => portfolio.portfolio_id !== portfolioId
      ),
    })),
  updatePortfolio: (updatedPortfolio) =>
    set((state) => ({
      portfolios: state.portfolios.map((portfolio) =>
        portfolio.portfolio_id === updatedPortfolio.portfolio_id
          ? updatedPortfolio
          : portfolio
      ),
    })),
  setPortfolios: (portfolios) => set({ portfolios }),
}));
