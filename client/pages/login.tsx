import { Navbar } from "components/navbar/navbar.component";
import Head from "next/head";
import { LoginLayout } from "layouts/login/login.layout";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "hooks/auth.hook";
import { useEffect } from "react";

export default function Login(): JSX.Element {
  const router = useRouter();

  const user = useAuth((state) => state.user);

  useEffect(() => {
    if (user.uid) {
      router.push("/dashboard");
    }
  }, [user]);

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
