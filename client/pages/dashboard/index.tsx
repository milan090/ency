import { useAuth } from "hooks/auth.hook";
import { Appbar } from "layouts/appbar/appbar.layout";
import { DashboardHome } from "layouts/dashboard-home/dashboard-home.layout";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";

export default function DashboardPage(): JSX.Element {
  const router = useRouter();

  const { user, isLoading } = useAuth((state) => ({
    isLoading: state.isLoading,
    user: state.user,
  }));

  useEffect(() => {
    if (!isLoading && !user.uid) {
      router.push("/login");
    }
  }, [isLoading, user]);

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
