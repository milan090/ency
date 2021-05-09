import Head from "next/head";
import { HomeFeatures } from "src/client/layouts/home-features/home-features.layout";
import { HomeHeroLayout } from "src/client/layouts/home-hero/home-hero.layout";
import { Navbar } from "src/client/components/navbar/navbar.component";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Ency | Home Page</title>
      </Head>
      <Navbar />
      <HomeHeroLayout />
      <div className="mt-16">
        <img
          src="/images/home/website-preview-tablets.png"
          alt="Website preview on tablets"
          width="100%"
        />
      </div>
      <HomeFeatures />
    </div>
  );
}
