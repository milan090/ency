import Head from "next/head";
import { HomeFeatures } from "src/client/layouts/home/home-features/home-features.layout";
import { HomeHeroLayout } from "src/client/layouts/home/home-hero/home-hero.layout";
import { Navbar } from "src/client/components/navbar/navbar.component";
import { Footer } from "src/client/layouts/home/footer/footer.layout";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Ency | Home Page</title>
      </Head>
      <Navbar />
      <HomeHeroLayout />
      <HomeFeatures />
      <Footer />
    </div>
  );
}
