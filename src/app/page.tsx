'use client';

import { SearchInput } from '@/components/SearchInput';

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>GitHub Repository Explorer</h1>
          <p className='text-muted-foreground'>Search for GitHub users and explore their repositories</p>
        </div>

        <div className='flex justify-center mb-8'>
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
