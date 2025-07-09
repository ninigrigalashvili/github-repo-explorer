'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, User } from 'lucide-react';
import { GitHubUser } from '@/types/github';

interface SearchInputProps {
  onUserSelect: (username: string) => void;
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
  onSearchChange: (query: string) => void;
}

export function SearchInput({ onUserSelect, users, loading, error, onSearchChange }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    onSearchChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleUserSelection = (username: string) => {
    setQuery(username);
    setShowSuggestions(false);
    onUserSelect(username);
  };

  const handleManualSearch = () => {
    if (query.trim()) {
      onUserSelect(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className='relative w-full max-w-md'>
      <div className='flex gap-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input
            ref={inputRef}
            type='text'
            placeholder='Search GitHub users...'
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowSuggestions(query.length > 0)}
            className='pl-10'
          />
        </div>
        <Button className='cursor-pointer' onClick={handleManualSearch} disabled={!query.trim()}>
          Search
        </Button>
      </div>

      {showSuggestions && (
        <Card ref={suggestionsRef} className='absolute z-10 w-full mt-1 max-h-64 overflow-y-auto'>
          {loading && <div className='p-4 text-center text-sm text-muted-foreground'>Searching...</div>}

          {error && <div className='p-4 text-center text-sm text-destructive'>{error}</div>}

          {!loading && !error && users.length === 0 && query.trim() && (
            <div className='p-4 text-center text-sm text-muted-foreground'>No users found</div>
          )}

          {!loading && users.length > 0 && (
            <div className='py-2'>
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelection(user.login)}
                  className='w-full px-4 py-2 hover:bg-accent hover:text-accent-foreground flex items-center gap-3 text-left'
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={user.avatar_url} alt={user.login} />
                    <AvatarFallback>
                      <User className='h-4 w-4' />
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.login}</span>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
