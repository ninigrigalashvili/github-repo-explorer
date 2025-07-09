'use client';

import { SearchInput } from '@/components/SearchInput';

import { useDebounce } from '@/lib/hooks/useDebounce';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGitHubSearch } from '@/lib/hooks/useGithubSearch';
import { RepositoryCard } from '@/components/RepositoryCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  // Debounced search query to avoid excessive API calls
  const debouncedQuery = useDebounce(searchQuery, 300);
  // Custom hook for searching users and repositories
  const { users, repositories, loading, error, selectedUser, fetchUserRepositories } = useGitHubSearch(debouncedQuery);

  // handler when selecting a user from suggestions
  const handleUserSelect = (username: string) => {
    fetchUserRepositories(username);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 text-center'>
          <h1 className='mb-4 text-4xl font-bold'>GitHub Repository Explorer</h1>
          <p className='text-muted-foreground'>Search for GitHub users and explore their repositories</p>
        </div>

        <div className='mb-8 flex justify-center'>
          <SearchInput
            onUserSelect={handleUserSelect}
            users={users}
            loading={loading && !selectedUser}
            error={error}
            onSearchChange={setSearchQuery}
          />
        </div>

        {selectedUser && (
          <div className='mb-6'>
            <h2 className='mb-4 text-2xl font-semibold'>Repositories for {selectedUser}</h2>

            {loading && (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className='h-48' />
                ))}
              </div>
            )}

            {error && <div className='text-destructive py-8 text-center'>{error}</div>}

            {!loading && !error && repositories.length === 0 && (
              <div className='text-muted-foreground py-8 text-center'>No repositories found for this user.</div>
            )}

            {!loading && repositories.length > 0 && (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repository={repo} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
