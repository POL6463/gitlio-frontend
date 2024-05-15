import React, { useState } from 'react';
import { Portfolio, useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { formatDistance } from 'date-fns';
import { FaRegTrashAlt } from 'react-icons/fa';

const PortfolioComponent = () => {
  const {
    portfolios,
    addPortfolio,
    removePortfolio,
    updatePortfolio,
    setCurrentPortfolio,
  } = useUserStore();
  const router = useRouter();

  const handleRemovePortfolio = (id: number) => {
    removePortfolio(id);
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setCurrentPortfolio(portfolio); // 선택된 포트폴리오를 스토어에 설정
    router.push(`/editor/${portfolio.portfolio_id}`); // 편집 페이지로 리디렉션
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.portfolio_id}
            className="card w-96 shadow-xl border m-2"
          >
            <div className="card-body">
              <div className="flex flex-row justify-between">
                <h2 className="card-title">{portfolio.title}</h2>
                {portfolio.deployed ? (
                  <span className="badge badge-success">Deployed</span>
                ) : (
                  <span className="badge badge-warning">Draft</span>
                )}
              </div>
              {/*<p>{portfolio.domain_name}</p>*/}
              <p className="text-gray-600 text-sm">
                {formatDistance(portfolio.created_at, new Date(), {
                  addSuffix: true,
                })}
              </p>
              <input
                type="textarea"
                className="input input-bordered w-full max-w-xs"
                value={`https://gitlio-frontend.vercel.app/portfolio/${portfolio.portfolio_id}`}
                disabled
              />

              <div className="flex flex-row mt-2 justify-between">
                <button
                  className="btn bg-transparent"
                  onClick={() => handleRemovePortfolio(portfolio.portfolio_id)}
                >
                  <FaRegTrashAlt className="fill-red-500" />
                </button>
                <button
                  className="btn "
                  onClick={() => handleEditPortfolio(portfolio)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioComponent;
