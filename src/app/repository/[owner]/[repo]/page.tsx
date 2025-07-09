'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Star, GitFork, ExternalLink, User, Calendar, Code } from 'lucide-react';
import { GitHubRepository } from '@/types/github';

import { Skeleton } from '@/components/ui/skeleton';
import { getRepository } from '@/lib/github-api';

export default function RepositoryDetail() {
  const params = useParams();
  const router = useRouter();
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract owner and repo from params
  const owner = params.owner as string;
  const repo = params.repo as string;

  // Fetch repository data when owner or repo changes
  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);
        setError(null);
        const repoData = await getRepository(owner, repo);
        setRepository(repoData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository');
      } finally {
        setLoading(false);
      }
    };

    if (owner && repo) {
      fetchRepository();
    }
  }, [owner, repo]);

  // Format ISO date string to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Show loading skeleton while fetching data
  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='mx-auto max-w-4xl'>
          <Skeleton className='mb-6 h-10 w-32' />
          <Skeleton className='h-64 w-full' />
        </div>
      </div>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='mx-auto max-w-4xl'>
          <Button variant='ghost' onClick={() => router.back()} className='mb-6 cursor-pointer'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Button>
          <div className='text-destructive py-8 text-center'>{error}</div>
        </div>
      </div>
    );
  }

  // Show not found message if repository is null
  if (!repository) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='mx-auto max-w-4xl'>
          <Button variant='ghost' onClick={() => router.back()} className='mb-6 cursor-pointer'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Button>
          <div className='text-muted-foreground py-8 text-center'>Repository not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <Button variant='ghost' onClick={() => router.back()} className='mb-6 cursor-pointer'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Search
        </Button>

        <Card>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div>
                <CardTitle className='mb-2 text-3xl'>{repository.name}</CardTitle>
                <p className='text-muted-foreground mb-4 text-lg'>
                  {repository.description || 'No description available'}
                </p>
              </div>
              <Button asChild>
                <a
                  href={repository.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2'
                >
                  <ExternalLink className='h-4 w-4' />
                  View on GitHub
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={repository.owner.avatar_url} alt={repository.owner.login} />
                <AvatarFallback>
                  <User className='h-6 w-6' />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-semibold'>{repository.owner.login}</p>
                <p className='text-muted-foreground text-sm'>Repository Owner</p>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='flex items-center gap-2'>
                <Star className='h-5 w-5 text-yellow-500' />
                <span className='font-semibold'>{repository.stargazers_count}</span>
                <span className='text-muted-foreground'>Stars</span>
              </div>
              <div className='flex items-center gap-2'>
                <GitFork className='h-5 w-5 text-blue-500' />
                <span className='font-semibold'>{repository.forks_count}</span>
                <span className='text-muted-foreground'>Forks</span>
              </div>
              {repository.language && (
                <div className='flex items-center gap-2'>
                  <Code className='h-5 w-5 text-green-500' />
                  <Badge variant='secondary'>{repository.language}</Badge>
                </div>
              )}
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                <Calendar className='h-4 w-4' />
                <span>Created: {formatDate(repository.created_at)}</span>
              </div>
              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                <Calendar className='h-4 w-4' />
                <span>Updated: {formatDate(repository.updated_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
