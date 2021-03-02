import { Appbar } from "layouts/appbar/appbar.layout";
import { DashboardHome } from "layouts/dashboard-home/dashboard-home.layout";
import Head from "next/head";

export default function DashboardPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex">
        <Appbar />
        <main className="w-full">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
}
