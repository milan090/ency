import Head from "next/head";
import { Navbar } from "components/navbar/navbar.component";
import { SignUpLayout } from "layouts/sign-up/sign-up.layout";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import { useEffect } from "react";

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "url(/images/sign-up/bg.svg) no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Head>
        <title>Ency | Sign Up</title>
      </Head>
      <Navbar />
      <SignUpLayout />
    </div>
  );
}
