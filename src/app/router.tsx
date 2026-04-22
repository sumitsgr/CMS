import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { paths } from "../config/paths";
// import { ProtectedRoute } from "@/lib/auth";
import { ProtectedRoute } from "../lib/auth";
import { default as AppRoot } from "./routes/app/root";
// import {
//   default as AppRoot,
//   ErrorBoundary as AppRootErrorBoundary,
// } from "./routes/app/root";

const convert = (queryClient: QueryClient) => (m) => {
  // console.log("m", m);
  // console.log("queryClient", queryClient);
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  // console.log(clientLoader);
  // console.log(clientAction);
  // console.log(Component);
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import("./routes/landing").then(convert(queryClient)),
    },
    {
      path: paths.testing.path,
      lazy: () => import("./routes/testing").then(convert(queryClient)),
    },
    // {
    //   path: paths.auth.register.path,
    //   lazy: () => import("./routes/auth/register").then(convert(queryClient)),
    // },
    {
      path: paths.auth.login.path,
      lazy: () => import("./routes/auth/login").then(convert(queryClient)),
    },
    // {
    //   path: paths.app.dashboard.path,
    //   lazy: () => import("./routes/app/dashboard").then(convert(queryClient)),
    // },
    {
      path: paths.app.root.path, // "/app"
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          // index: true, // 👈 this replaces path: ""
          path: paths.app.dashboard.path,
          lazy: () =>
            import("./routes/app/dashboard").then(convert(queryClient)),
        },
        {
          path: paths.app.discussions.path,
          lazy: () =>
            import("./routes/app/discussions/discussions").then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.users.path,
          lazy: () => import("./routes/app/users").then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import("./routes/app/profile").then(convert(queryClient)),
        },

      ],
    },
    // {
    //   path: paths.app.root.path,
    //   element: (
    //     <ProtectedRoute>
    //       <AppRoot />
    //     </ProtectedRoute>
    //   ),
    //   // ErrorBoundary: AppRootErrorBoundary,
    //   children: [
    //     {
    //       path: paths.app.discussions.path,
    //       lazy: () =>
    //         import("./routes/app/discussions/discussions").then(
    //           convert(queryClient),
    //         ),
    //     },
    //     // {
    //     //   path: paths.app.discussion.path,
    //     //   lazy: () =>
    //     //     import("./routes/app/discussions/discussion").then(
    //     //       convert(queryClient),
    //     //     ),
    //     // },
    //     {
    //       path: paths.app.users.path,
    //       lazy: () => import("./routes/app/users").then(convert(queryClient)),
    //     },
    //     // {
    //     //   path: paths.app.profile.path,
    //     //   lazy: () => import("./routes/app/profile").then(convert(queryClient)),
    //     // },
    //     {
    //       path: paths.app.dashboard.path,
    //       lazy: () =>
    //         import("./routes/app/dashboard").then(convert(queryClient)),
    //     },
    //   ],
    // },
    // {
    //   path: "*",
    //   lazy: () => import("./routes/not-found").then(convert(queryClient)),
    // },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  //   console.log("queryClient", queryClient);

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
