'use client';

import React from 'react';
import { Search, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';

export function SearchInput() {
  const [query, setQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <div className='relative w-full max-w-md'>
      <div className='flex gap-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-3 h-3 w-3 text-muted-foreground' />
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
        <Button className='cursor-pointer' onClick={() => {}} disabled={!query.trim()}>
          Search
        </Button>
      </div>

      {showSuggestions && (
        <Card className='absolute z-10 w-full mt-1 max-h-64 overflow-y-auto'>
          <div className='py-2'>
            <button
              key={'id-1'}
              onClick={() => {}}
              className='w-full px-4 py-2 hover:bg-accent hover:text-accent-foreground flex items-center gap-3 text-left'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage />
                <AvatarFallback>
                  <User className='h-4 w-4' />
                </AvatarFallback>
              </Avatar>
              <span>{'USER_LOGIN'}</span>
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
