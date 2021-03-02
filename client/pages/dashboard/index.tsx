import { Appbar } from "layouts/appbar/appbar.layout";
import { DashboardHome } from "layouts/dashboard-home/dashboard-home.layout";
import Head from "next/head";

export default function DashboardPage(): JSX.Element {
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
