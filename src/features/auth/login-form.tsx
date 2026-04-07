import { Link, useSearchParams } from "react-router";

// import { Button } from "@/components/ui/button";
import { Button } from "../../components/ui/button";
// import { Form, Input } from "@/components/ui/form";
import { Form, Input } from "../../components/ui/form";
// import { paths } from "@/config/paths";
import { paths } from "../../config/paths";
import { useLogin, loginInputSchema } from "../../lib/auth";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <div>
      <Form
        onSubmit={(values) => {
          const payload = {
            ...values,
            deviceInfo: "",
            fcmToken: "", // 👈 extra field
          };

          login.mutate(payload);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            {/* <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            /> */}
            <Input
              type="text"
              label="Mobile Number"
              error={formState.errors["mobile"]}
              registration={register("mobile")}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password")}
            />
            <div>
              <Button
                isLoading={login.isPending}
                type="submit"
                className="w-full"
              >
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div> */}
    </div>
  );
};
