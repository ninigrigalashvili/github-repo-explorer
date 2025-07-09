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

  // Formats ISO date string to locale date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Navigates to the repository details page
  const handleCardClick = () => {
    router.push(`/repository/${repository.owner.login}/${repository.name}`);
  };

  // Opens the GitHub repo in a new tab, prevents card click
  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(repository.html_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className='h-full cursor-pointer transition-shadow hover:shadow-lg' onClick={handleCardClick}>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <CardTitle className='hover:text-primary text-lg transition-colors'>{repository.name}</CardTitle>
          <Button variant='ghost' size='sm' onClick={handleExternalClick} className='cursor-pointer'>
            <ExternalLink className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='flex h-full flex-col justify-between gap-3'>
        <div className='space-y-3'>
          <p className='text-muted-foreground line-clamp-2 text-sm'>
            {repository.description || 'No description available'}
          </p>

          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
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
          <span className='text-muted-foreground text-xs'>Updated {formatDate(repository.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
