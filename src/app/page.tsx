'use client';

import { SearchInput } from '@/components/SearchInput';

import { useDebounce } from '@/lib/hooks/useDebounce';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGitHubSearch } from '@/lib/hooks/useGithubSearch';
import { RepositoryCard } from '@/components/RepositoryCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { users, repositories, loading, error, selectedUser, fetchUserRepositories } = useGitHubSearch(debouncedQuery);

  const handleUserSelect = (username: string) => {
    fetchUserRepositories(username);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>GitHub Repository Explorer</h1>
          <p className='text-muted-foreground'>Search for GitHub users and explore their repositories</p>
        </div>

        <div className='flex justify-center mb-8'>
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
            <h2 className='text-2xl font-semibold mb-4'>Repositories for {selectedUser}</h2>

            {loading && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className='h-48' />
                ))}
              </div>
            )}

            {error && <div className='text-center py-8 text-destructive'>{error}</div>}

            {!loading && !error && repositories.length === 0 && (
              <div className='text-center py-8 text-muted-foreground'>No repositories found for this user.</div>
            )}

            {!loading && repositories.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
