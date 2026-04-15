import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '../../../lib/api-client';
import { MutationConfig } from '../../../lib/react-query';

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Min. 5 characters"),
  mobile: z.string().min(10, "Min. 10 digits"),
  role_id: z.number({ invalid_type_error: "Required" }),
  project_ids: z.array(z.number()).min(1, "Add at least one project"),
  is_active: z.number().default(1),
  admin_id: z.string().optional().default(""),
  // supervisor_id: z.string().optional().default(""),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const createUser = ({ data }: { data: CreateUserInput & { employee_code: string } }) => {
  // console.log(data);
  return api.post(`/api/users`, data);
};

type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ mutationConfig }: UseCreateUserOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => { onSuccess?.(...args); },
    ...restConfig,
    mutationFn: createUser,
  });
};

export const getAdmins = () => {
  return api.post('/api/users/users/admins');
};

export const useAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: getAdmins,
  });
};

export const getSupervisors = () => {
  return api.get('/api/users/users/supervisors');
};

export const useSupervisors = () => {
  return useQuery({
    queryKey: ['supervisors'],
    queryFn: getSupervisors,
  });
};