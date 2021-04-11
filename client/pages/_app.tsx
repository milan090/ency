import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/tailwind.css";
import "../styles/globals.css";

import { domain } from "utils/domain";
import { useEffect } from "react";
import { auth } from "config/firebase";
import { useAuth } from "hooks/auth.hook";
import { axios } from "config/axios";
import { UserEntity } from "types/auth.types";
import shallow from "zustand/shallow";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const { setIsLoading, setUser, setToken } = useAuth(
    (state) => ({
      setUser: state.setUser,
      setIsLoading: state.setIsLoading,
      setToken: state.setToken,
      token: state.token,
    }),
    shallow
  );

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          setToken(token);

          const { data } = await axios.get<UserEntity>("/auth", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const { name, email, uid } = data;
          setUser({ name, email, uid });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser({ uid: "", email: "", name: "" });
        setIsLoading(false);
      }
    });
  }, [setToken, setUser, setIsLoading]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta
          property="og:title"
          content="Ency | Traditional Writing is good. But it could be better 👍"
        />
        <meta
          property="og:description"
          content="Presenting to you Ency, an AI Assisstant that helps you complete your reports, assignments and articles much faster & easier. There’s no turning back now!"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content={`https://${domain}`} />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
