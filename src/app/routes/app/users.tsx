import { QueryClient } from "@tanstack/react-query";

// import { ContentLayout } from "@/components/layouts";
import { ContentLayout } from "../../../components/layouts";
// import { getUsersQueryOptions } from "@/features/users/api/get-users";
import { getUsersQueryOptions } from "../../../features/users/api/get-users";

// import { UsersList } from "@/features/users/components/users-list";
import { UsersList } from "../../../features/users/components/users-list";
<<<<<<< HEAD
import { CreateUser } from "../../../features/users/components/create-user";
=======
>>>>>>> origin
// import { Authorization, ROLES } from "@/lib/authorization";

import { Authorization, ROLES } from "../../../lib/authorization";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const UsersRoute = () => {
  return (
<<<<<<< HEAD
    // <ContentLayout title="Users">
    //   <CreateUser></CreateUser>
    //   {/* <Authorization
    //     forbiddenFallback={<div>Only admin can view this.</div>}
    //     allowedRoles={[ROLES.ADMIN]}
    //   > */}
    //   <UsersList />
    //   {/* hey */}
    //   {/* </Authorization> */}
    // </ContentLayout>
    <ContentLayout title="Users">
      <div>
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              User Information
            </h3>
            <CreateUser />
          </div>
        </div>
        <UsersList />
      </div>
=======
    <ContentLayout title="Users">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <UsersList />
        {/* hey */}
      </Authorization>
>>>>>>> origin
    </ContentLayout>
  );
};

export default UsersRoute;
