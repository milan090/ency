import { BlackBorderWhiteBGButton } from "components/CustomButtons/whitebg-button.component";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, Globe, Home, IconProps, LogOut, Plus, Settings, User } from "react-feather";
import { useRouter } from "next/dist/client/router";
import { logout } from "utils/auth.utils";

type AppbarLinkProps = {
  href: string;
  value: string;
  Icon: React.FC<IconProps>;
};

type AppbarNavItemsProps = {
  isActive?: boolean;
  value: string;
  Icon: React.FC<IconProps>;
};

const appbarLinks: AppbarLinkProps[] = [
  {
    href: "/dashboard",
    Icon: Home,
    value: "Home",
  },
  {
    href: "/dashboard/community",
    Icon: Globe,
    value: "Community",
  },
  {
    value: "Profile Page",
    href: "/dashboard/profile",
    Icon: User,
  },
  {
    href: "/dashboard/settings",
    value: "Settings",
    Icon: Settings,
  },
  {
    href: "/premium",
    value: "Upgrade",
    Icon: DollarSign,
  },
];

export const Appbar: React.FC = () => {
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      // Setting user state to empty and redirecting to login page will happen in _app.tsx
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="md:w-72 xl:w-80 flex flex-col max-h-screen h-screen pt-12 pb-8">
      <Link href="/">
        <a className="pl-8">
          <img src="/images/logo.svg" alt="Ency Logo" />
        </a>
      </Link>

      {/* Create Project Button */}
      <div className="mt-16 pl-8">
        <BlackBorderWhiteBGButton>
          <div className="flex text-sm items-center">
            <span className="mr-2">
              <Plus size={16} />
            </span>
            <span className="font-semibold">Create Project</span>
          </div>
        </BlackBorderWhiteBGButton>
      </div>

      {/* Appbar Links */}
      <div className="mt-10">
        {appbarLinks.map((props, i) => (
          <AppbarLink {...props} key={i} />
        ))}
      </div>

      <div className="mt-auto">
        <button onClick={handleLogout}>
          <AppbarNavItem Icon={LogOut} value="Logout" />
        </button>
        <p className="text-xs text-gray-600 pl-8 mt-2">
          <a href="" className="hover:underline">
            Privacy Policy
          </a>
          <span> • </span>
          <a href="" className="hover:underline">
            Terms & Conditions
          </a>
        </p>
      </div>
    </nav>
  );
};

const AppbarLink: React.FC<AppbarLinkProps> = ({ href, value, Icon }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(router.route === href);
  }, [router.route, href]);

  return (
    <Link href={href}>
      <a href={href}>
        <AppbarNavItem Icon={Icon} value={value} isActive={isActive} />
      </a>
    </Link>
  );
};

const AppbarNavItem: React.FC<AppbarNavItemsProps> = ({ isActive = false, value, Icon }) => {
  return (
    <span
      className={`w-full text-sm py-4 pl-8 flex items-center ${
        isActive && "border-r-4 border-black"
      }`}
      style={{
        background: isActive
          ? "linear-gradient(270deg, rgba(51, 51, 51, 0.09) 0%, rgba(51, 51, 51, 0.05) 41.41%, rgba(51, 51, 51, 0.01) 91.55%)"
          : "",
      }}
    >
      <span className="mr-4">
        <Icon className="stroke-gray-500" />
      </span>
      <span className="text-gray-700">{value}</span>
    </span>
  );
};
