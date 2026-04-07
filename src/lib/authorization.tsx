import * as React from "react";

// import { Comment, User } from '@/types/api';

import { useUser } from "./auth";

export enum ROLES {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "CLIENT",
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  "comment:delete": (user, comment) => {
    if (user.role === "ADMIN") {
      return true;
    }

    if (user.role === "USER" && comment.author?.id === user.id) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const user = useUser();
  // console.log(user);

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: ROLES[] }) => {
      if (!user.data) return false;

      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles.includes(user.data.role_name);
      }

      return true;
    },
    [user.data],
  );

  return {
    checkAccess,
    role: user.data?.role_name,
    isLoading: user.isLoading,
  };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
