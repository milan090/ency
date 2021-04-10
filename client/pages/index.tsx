import Head from "next/head";
import { HomeFeatures } from "layouts/home-features/home-features.layout";
import { HomeHeroLayout } from "layouts/home-hero/home-hero.layout";
import { Navbar } from "components/navbar/navbar.component";

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
