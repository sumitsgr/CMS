import { useNavigate, useSearchParams } from "react-router";

// import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from "../../../config/paths";
// import { LoginForm } from '@/features/auth/components/login-form';
import { LoginForm } from "../../../features/auth/login-form";
// import { LoginForm } from "../../../features/auth/login-form";
import { AuthLayout } from "../../../components/layouts/auth-layout";
const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="Log in to your account">
      <LoginForm
        onSuccess={() => {
          navigate(
            `${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`,
            {
              replace: true,
            },
          );
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
