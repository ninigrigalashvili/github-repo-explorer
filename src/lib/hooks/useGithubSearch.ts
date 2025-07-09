import { useState, useEffect } from 'react';
import { GitHubUser, GitHubRepository } from '@/types/github';
import { getUserRepositories, searchUsers } from '@/lib/github-api';

export function useGitHubSearch(query: string) {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await searchUsers(query);
        setUsers(response.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  const fetchUserRepositories = async (username: string) => {
    setLoading(true);
    setError(null);
    setSelectedUser(username);

    try {
      const repos = await getUserRepositories(username);
      setRepositories(repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    repositories,
    loading,
    error,
    selectedUser,
    fetchUserRepositories,
  };
}
