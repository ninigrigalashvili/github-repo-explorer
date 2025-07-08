import { GitHubRepository, GitHubSearchResponse } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const headers: HeadersInit = {};

    // Add GitHub token for higher rate limits (5000/hour vs 60/hour)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 404) {
        throw new Error('User or repository not found.');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch data from GitHub API');
  }
}

export async function searchUsers(query: string): Promise<GitHubSearchResponse> {
  if (!query.trim()) {
    return { total_count: 0, incomplete_results: false, items: [] };
  }

  const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=10`;
  return fetchWithErrorHandling<GitHubSearchResponse>(url);
}

export async function getUserRepositories(username: string): Promise<GitHubRepository[]> {
  const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30`;
  return fetchWithErrorHandling<GitHubRepository[]>(url);
}

export async function getRepository(owner: string, repo: string): Promise<GitHubRepository> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
  return fetchWithErrorHandling<GitHubRepository>(url);
}
