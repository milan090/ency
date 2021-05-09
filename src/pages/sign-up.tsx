import Head from "next/head";
import { Navbar } from "src/client/components/navbar/navbar.component";
import { SignUpLayout } from "src/client/layouts/sign-up/sign-up.layout";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session?.user.id) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

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
