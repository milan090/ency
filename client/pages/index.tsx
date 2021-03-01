import { Navbar } from "components/navbar/navbar.component";
import { HomeFeatures } from "layouts/home-features/home-features.layout";
import { HomeHeroLayout } from "layouts/home-hero/home-hero.layout";

export default function HomePage(): JSX.Element {
  return (
    <div>
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
