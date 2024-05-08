'use server';
import axios from 'axios';

class UserNotFoundErr extends Error {}

export async function getIdAfterLogin(data: {
  clerk_id: string;
  email: string;
  name: string | null;
}) {
  const response = await axios.post(process.env.API_URL + 'users/', data, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(response.data);
  return response.data.user_id; // 백엔드에서 userId를 반환한다고 가정
}
