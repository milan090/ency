import { Navbar } from "components/navbar/navbar.component";
import Head from "next/head";
import { LoginLayout } from "layouts/login/login.layout";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSession } from "next-auth/client";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div>
      <div
        className="min-h-screen"
        style={{
          background: "url(/images/login/bg.svg) no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Head>
          <title>Ency | Sign Up</title>
        </Head>
        <Navbar />
        <LoginLayout />
      </div>
    </div>
  );
}
