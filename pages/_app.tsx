import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/tailwind.css";
import "../styles/globals.css";
import { AuthProvider } from "hooks/useAuth.provider";
import { AutoSaveProvider } from "hooks/useAutoSave";
import { ProjectProvider } from "hooks/useProject";
import { ChatProvider } from "hooks/useChat";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <AutoSaveProvider>
        <ProjectProvider>
          <ChatProvider>
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
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
          </ChatProvider>
        </ProjectProvider>
      </AutoSaveProvider>
    </AuthProvider>
  );
}
