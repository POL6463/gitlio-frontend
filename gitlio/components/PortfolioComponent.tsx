import React, { useState } from 'react';
import { useUserStore } from '@/store/userStore';

const PortfolioComponent = () => {
  const { portfolios, addPortfolio, removePortfolio, updatePortfolio } =
    useUserStore();

  const handleAddPortfolio = () => {
    const newPortfolio = {
      created_at: new Date().toISOString(),
      deployed: false,
      domain_name: 'new-portfolio',
      mongo_id: 'some-mongo-id',
      portfolio_id: Date.now(), // 임시로 timestamp를 사용하여 고유 ID를 생성
      title: 'New Portfolio',
      updated_at: null,
    };
    addPortfolio(newPortfolio);
  };

  const handleRemovePortfolio = (id: number) => {
    removePortfolio(id);
  };

  const handleUpdatePortfolio = (id: number) => {
    const updatedPortfolio = {
      created_at: '2024-05-12T12:58:09.887545',
      deployed: true,
      domain_name: 'updated-portfolio',
      mongo_id: '6640bce152a5de0fef96836e',
      portfolio_id: id,
      title: 'Updated Portfolio',
      updated_at: new Date().toISOString(),
    };
    updatePortfolio(updatedPortfolio);
  };

  return (
    <div>
      <button onClick={handleAddPortfolio}>Add Portfolio</button>
      <div className="flex flex-row flex-wrap">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.portfolio_id}
            className="card w-96 bg-base-300 shadow-xl m-2"
          >
            <div className="card-body">
              <h2 className="card-title">{portfolio.title}</h2>
              <p>{portfolio.domain_name}</p>
              <p>{portfolio.created_at}</p>
              <p>{portfolio.deployed ? 'Deployed' : 'Not Deployed'}</p>
              <p>{portfolio.mongo_id}</p>
              <p>{portfolio.updated_at}</p>
              <button
                onClick={() => handleRemovePortfolio(portfolio.portfolio_id)}
              >
                Remove
              </button>
              <button
                onClick={() => handleUpdatePortfolio(portfolio.portfolio_id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioComponent;
