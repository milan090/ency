import { Appbar } from "src/client/layouts/appbar/appbar.layout";
import { DashboardHome } from "src/client/layouts/dashboard-home/dashboard-home.layout";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import { authRequired } from "src/utils/authRequired";

export const getServerSideProps = authRequired();

export default function DashboardPage(): JSX.Element {
  const router = useRouter();

  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, router, session]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-screen">
        <Appbar />
        <main className="w-full overflow-hidden flex flex-1">
          <div className="overflow-y-scroll flex-1">
            <DashboardHome />
          </div>
        </main>
      </div>
    </div>
  );
}
