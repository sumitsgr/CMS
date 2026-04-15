import { queryOptions, useQuery } from '@tanstack/react-query';

// import { api } from '@/lib/api-client';
import { api } from '../../../lib/api-client';
// import { QueryConfig } from '@/lib/react-query';
import { QueryConfig } from '../../../lib/react-query';
// import { User } from '@/types/api';

export const getProjects = () => {
  return api.get(`/api/projects`);
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};

type UseProjectsOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useProjects = ({ queryConfig }: UseProjectsOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};
