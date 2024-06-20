import { getIdAfterLogin, getUserPortfolios } from '@/actions/user';
import { useUserStore } from '@/store/userStore';
import { useUser } from '@clerk/nextjs';

// Zustand 스토어 사용 설정
const { setUserId, setPortfolios } = useUserStore.getState();

// 사용자 ID를 가져오는 함수
export const fetchUserId = async (user: any) => {
  if (user && user.id) {
    const existingUserId = useUserStore.getState().userId;
    if (!existingUserId) {
      try {
        const fetchedUserId: number = await getIdAfterLogin({
          clerk_id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.fullName,
        });
        setUserId(fetchedUserId);
        return fetchedUserId; // 다음 단계에서 사용할 수 있도록 fetchedUserId를 반환합니다.
      } catch (err) {}
    } else {
      return existingUserId;
    }
  }
  return null;
};

// 포트폴리오 목록을 가져오는 함수
export const fetchPortfolios = async () => {
  const id = useUserStore.getState().userId;
  if (!id) return; // userId가 없다면 실행하지 않음
  try {
    const portfolios = await getUserPortfolios(id.toString());
    console.log(portfolios);
    if (Array.isArray(portfolios)) {
      setPortfolios(portfolios);
    } else {
      console.error('Expected an array of portfolios, received:', portfolios);
      setPortfolios([]);
    }
  } catch (err) {
    console.error('Failed to fetch portfolios:', err);
  }
};
