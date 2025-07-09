import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { GitHubRepository } from '@/types/github';
import Link from 'next/link';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className='h-full hover:shadow-lg transition-shadow'>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-lg'>
            <Link
              href={`/repository/${repository.owner.login}/${repository.name}`}
              className='hover:text-primary transition-colors'
            >
              {repository.name}
            </Link>
          </CardTitle>
          <Button variant='ghost' size='sm' asChild>
            <a href={repository.html_url} target='_blank' rel='noopener noreferrer' className='flex items-center gap-1'>
              <ExternalLink className='h-4 w-4' />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <p className='text-sm text-muted-foreground line-clamp-2'>
          {repository.description || 'No description available'}
        </p>

        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Star className='h-4 w-4' />
            {repository.stargazers_count}
          </div>
          <div className='flex items-center gap-1'>
            <GitFork className='h-4 w-4' />
            {repository.forks_count}
          </div>
        </div>

        <div className='flex items-center justify-between'>
          {repository.language && <Badge variant='secondary'>{repository.language}</Badge>}
          <span className='text-xs text-muted-foreground'>Updated {formatDate(repository.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
