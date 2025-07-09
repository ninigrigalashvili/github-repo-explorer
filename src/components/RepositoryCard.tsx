import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { GitHubRepository } from '@/types/github';
import { useRouter } from 'next/navigation';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleCardClick = () => {
    router.push(`/repository/${repository.owner.login}/${repository.name}`);
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(repository.html_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className='h-full hover:shadow-lg transition-shadow cursor-pointer' onClick={handleCardClick}>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-lg hover:text-primary transition-colors'>{repository.name}</CardTitle>
          <Button variant='ghost' size='sm' onClick={handleExternalClick}>
            <ExternalLink className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='flex flex-col justify-between h-full gap-3'>
        <div className='space-y-3'>
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
        </div>

        <div className='flex items-center justify-between'>
          {repository.language && <Badge variant='secondary'>{repository.language}</Badge>}
          <span className='text-xs text-muted-foreground'>Updated {formatDate(repository.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
