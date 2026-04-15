import { useNavigate } from "react-router";
import { paths } from "../../config/paths";
// import logo from "@/assets/logo.svg";
// import { Head } from '@/components/seo';
import { Head } from "../../components/seo/head";
// import { Button } from '@/components/ui/button';
import { Button } from "../../components/ui/button";
// import { paths } from '@/config/paths';
// import { useUser } from '@/lib/auth';
import { useUser } from "../../lib/auth";

const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();
  // console.log(user.data);

  const handleStart = () => {
    if (user.data) {
      navigate(paths.app.dashboard.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };

  // const handleStart = () => {
  //   // console.log("click");
  //   navigate(paths.auth.login.getHref());
  // };
  return (
    <>
      <Head description="Welcome to bulletproof react" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Management System</span>
          </h2>
          {/* <img src={logo} alt="react" /> */}
          <p>Showcasing Best Practices For Building React Applications</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button
                onClick={handleStart}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                }
              >
                Get started
              </Button>
              {/* <button onClick={handleStart}>Get Started</button> */}
            </div>
            <div className="ml-3 inline-flex">
              {/* <a
                href="https://github.com/alan2207/bulletproof-react"
                target="_blank"
                rel="noreferrer"
              > */}
              <Button
                variant="outline"
                icon={
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="size-6"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" />
                    <rect x="3" y="14" width="7" height="7" rx="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" />
                  </svg>
                }
              >
                Go to App
              </Button>
              {/* <button>Go to App</button> */}
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingRoute;
