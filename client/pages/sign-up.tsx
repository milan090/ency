import Head from "next/head";
import { Navbar } from "components/navbar/navbar.component";
import { SignUpLayout } from "layouts/sign-up/sign-up.layout";

export default function SignUpPage(): JSX.Element {
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
