'use client';
import useModalStore from '@/store/modalStore';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

export default function ShareModal() {
  const { closeModal } = useModalStore();
  const { portfolios, currentPortfolio } = useUserStore();
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    if (currentPortfolio && currentPortfolio.portfolio_id) {
      const matchingPortfolio = portfolios.find(
        (portfolio) => portfolio.portfolio_id === currentPortfolio.portfolio_id
      );

      if (matchingPortfolio) {
        const url = `https://gitlio-frontend.vercel.app/portfolio/${matchingPortfolio.domain_name}`;
        setPortfolioUrl(url);
      }
    }
  }, [currentPortfolio, portfolios]);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-25 backdrop-blur-sm backdrop-brightness-100">
      <div className="bg-white w-[580px] px-8 py-8 rounded-lg shadow-lg box-border">
        <h2 className="text-xl font-bold mb-4 text-center">
          다음 링크를 복사하십시오
        </h2>
        <div className="flex w-full justify-evenly items-center mt-6 mb-4">
          <input
            type="text"
            className="border rounded-l px-4 py-2 w-2/3"
            value={portfolioUrl}
            disabled
          />
          <button
            className="btn btn-info rounded-xl px-1 py-2 w-auto box-border"
            onClick={() => navigator.clipboard.writeText(portfolioUrl)}
          >
            클립보드
          </button>
        </div>
        <div className="flex justify-end w-full">
          <button className="btn btn-neutral mt-4" onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
