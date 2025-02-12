'use client';
import useModalStore from '@/store/modalStore';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

export default function ShareModal() {
  const { closeModal } = useModalStore();
  const { portfolios, currentPortfolio } = useUserStore();
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    console.log('currentPortfolio:', currentPortfolio); // 로그 추가
    console.log('portfolios:', portfolios); // 로그 추가
    if (currentPortfolio && currentPortfolio.portfolio_id) {
      const matchingPortfolio = portfolios.find(
        (portfolio) => portfolio.portfolio_id === currentPortfolio.portfolio_id
      );

      if (matchingPortfolio) {
        const url = `https://gitlio-frontend.vercel.app/portfolio/${matchingPortfolio.domain_name}`;
        setPortfolioUrl(url);
        console.log('Generated URL:', url); // 추가된 로그
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
            className="border rounded-l px-4 py-2 w-3/4"
            value={portfolioUrl}
            disabled
          />
          <button
            className="btn btn-info px-4 py-2 w-auto box-border"
            onClick={() => navigator.clipboard.writeText(portfolioUrl)}
          >
            복사
          </button>
        </div>
        <div className="flex justify-end w-full">
          <button
            className="btn btn-neutral px-4 py-2 w-auto box-border mt-4 mr-[23px]"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
