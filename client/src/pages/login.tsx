import { Navbar } from "src/client/components/navbar/navbar.component";
import Head from "next/head";
import { LoginLayout } from "src/client/layouts/login/login.layout";
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

export default function Login(): JSX.Element {
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
