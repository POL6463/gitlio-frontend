'use server';
import axios from 'axios';

class UserNotFoundErr extends Error {}

export async function getIdAfterLogin(data: {
  clerk_id: string;
  email: string;
  name: string | null;
}) {
  const response = await axios.post(process.env.API_URL + 'users', data, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(response.data);
  return response.data.user_id; // 백엔드에서 userId를 반환한다고 가정
}

export async function getUserPortfolios(userId: string) {
  const response = await axios.get(process.env.API_URL + 'users', {
    params: { user_id: userId },
  });

  //console.log(response.data);
  return response.data.portfolio; // 백엔드에서 portfolios를 반환한다고 가정
}

export async function createPortfolio(data: {
  user_id: string;
  title: string;
  domain_name: string;
}) {
  const response = await axios.post(process.env.API_URL + 'portfolios/', data, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('포트폴리오 아이디: ' + response.data.portfolio_id);
  return response.data.portfolio_id; // 백엔드에서 portfolioId를 반환한다고 가정
}
