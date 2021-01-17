import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/tailwind.css";
import "../styles/globals.css";
import { AuthProvider } from "hooks/useAuth.provider";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <div>
        <div className="sm:hidden">
          <h1 className="text-5xl font-bold mt-32 ml-5">
            Sorry <br /> We Do Not <br /> Support <br /> Mobile Yet
          </h1>
        </div>
        <div className="hidden sm:block">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  );
}
