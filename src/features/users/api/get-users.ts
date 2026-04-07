import { queryOptions, useQuery } from '@tanstack/react-query';

// import { api } from '@/lib/api-client';
import { api } from '../../../lib/api-client';
// import { QueryConfig } from '@/lib/react-query';
import { QueryConfig } from '../../../lib/react-query';
// import { User } from '@/types/api';

export const getUsers = () => {
  return api.get(`/api/users`);
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};
