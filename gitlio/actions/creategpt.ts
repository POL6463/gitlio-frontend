// 'use server';
import axios from 'axios';
import { domain } from '@/domain/domain';

interface CreateProjectData {
  githubId: string;
  repoUrl: string;
}

interface ProjectResponse {
  projectId: string;
  status: string;
  message?: string;
}

class ProjectCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectCreationError';
  }
}

export async function CreateGPTProject({
  githubId,
  repoUrl,
}: CreateProjectData): Promise<ProjectResponse> {
  try {
    const url = `https://gitlio.fly.dev/api/repositories/chat-gpt`;

    const requestBody = {
      user_id: '11',
      github_username: githubId,
      repository_url: [repoUrl],
    };
    console.log('Sending POST request to:', url);
    console.log('Request Body:', requestBody); // 요청 바디 확인

    const response = await axios.post(url, requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response received:', response);

    if (response.status !== 201) {
      throw new ProjectCreationError('Failed to create GPT project');
    }

    if (response.data.status !== 'success') {
      throw new ProjectCreationError('Failed to create GPT project');
    }

    console.log('Project created with ID:', response.data.projectId);
    return {
      projectId: response.data.projectId,
      status: 'success',
    };
  } catch (error: unknown) {
    console.error('HTTP Request Failed:', error); // 실패한 요청에 대한 정보 출력
    if (axios.isAxiosError(error) && error.response) {
      // Axios 오류일 경우, 응답 데이터도 출력
      console.error('Error response data:', error.response.data);
    }

    if (error instanceof Error) {
      throw new ProjectCreationError(error.message);
    } else {
      throw new ProjectCreationError('An unknown error occurred');
    }
  }
}
