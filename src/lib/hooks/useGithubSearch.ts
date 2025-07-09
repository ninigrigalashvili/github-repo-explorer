import { useState, useEffect } from 'react';
import { GitHubUser, GitHubRepository } from '@/types/github';
import { getUserRepositories, searchUsers } from '@/lib/github-api';

// Custom hook to handle GitHub user search and repository fetching
export function useGitHubSearch(query: string) {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Effect to search users when the query changes
  useEffect(() => {
    // If query is empty, clear users and errors
    if (!query.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    // Async function to search users
    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        // Call GitHub API to search users
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

  // Fetch repositories for a selected user
  const fetchUserRepositories = async (username: string) => {
    setLoading(true);
    setError(null);
    setSelectedUser(username);

    try {
      // Call GitHub API to get user repositories
      const repos = await getUserRepositories(username);
      setRepositories(repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  // Return state and actions for use in components
  return {
    users,
    repositories,
    loading,
    error,
    selectedUser,
    fetchUserRepositories,
  };
}
