import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/tailwind.css";
import "../styles/globals.css";
import { AuthProvider } from "hooks/useAuth.provider";
import { AutoSaveProvider } from "hooks/useAutoSave";
import { ProjectProvider } from "hooks/useProject";
import { ChatProvider } from "hooks/useChat";
import Head from "next/head";

const defaultDescription = "The Virtual Assisstant you need";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <AutoSaveProvider>
        <ProjectProvider>
          <ChatProvider>
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
              <title>Preferral</title>
              <meta property="og:image" content="./brand-logo.svg" />
              <meta property="og:title" content="Preferral API" />
              <link rel="icon" href="/favicon.ico" type="image/jpg" sizes="196x196" />
              <meta property="og:description" content={defaultDescription} />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
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
