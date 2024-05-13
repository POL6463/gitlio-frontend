'use server';
import React from 'react';
import axios from 'axios';
import { domain } from '@/domain/domain';

interface CreateProjectProps {
  githubId: string;
  repoUrl: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

export const CreateProjectServer: React.FC<CreateProjectProps> = ({
  githubId,
  repoUrl,
  onSuccess,
  onError,
}) => {
  React.useEffect(() => {
    const requestBody = {
      user_id: '0',
      github_username: githubId,
      repository_url: repoUrl,
    };

    axios
      .post(`${domain}/api/repositories/chat-gpt`, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.error('서버 컴포넌트에서 API 호출 실패:', error);
        onError(error);
      });

    // 서버 컴포넌트에서는 아무 것도 렌더링하지 않습니다.
  }, [githubId, repoUrl, onSuccess, onError]);

  return null;
};
