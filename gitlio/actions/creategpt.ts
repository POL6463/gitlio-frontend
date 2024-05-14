// 'use server';
import axios from 'axios';
import { domain } from '@/domain/domain';
import { Data } from '@/app/editor/(interface)/ProjectData';

interface CreateProjectData {
  githubId: string;
  repoUrl: string;
}

interface ProjectResponse {
  organization: string;
  readme_images: string[];
  gpt_response: string[];
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
}: CreateProjectData): Promise<Data> {
  try {
    const url = `${domain}/repositories/chat-gpt`;
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

    return {
      url: repoUrl,
      title: response.data.organization,
      intro: 'Generated by API', // 가정된 설명
      images: response.data.readme_images,
      sentences: response.data.gpt_response,
      serviceUrl: '', // 서비스 URL은 필요에 따라 추가
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ProjectCreationError(error.message);
    } else {
      throw new ProjectCreationError('An unknown error occurred');
    }
  }
}
