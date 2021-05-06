import React from "react";
import { Home, IconProps, Search, Tag, Users } from "react-feather";

const features: { Icon: React.FC<IconProps>; title: string; content: string }[] = [
  {
    Icon: Search,
    title: "Summarization",
    content: "Easily Summarize stuff with ency’s powerful aI ",
  },
  {
    Icon: Tag,
    title: "Stay Organized",
    content: "Add tags to your projects and also easily search for them.",
  },
  {
    Icon: Home,
    title: "Cool Community",
    content: "Easily Summarize stuff with ency’s powerful aI ",
  },
  {
    Icon: Users,
    title: "Work Together",
    content: "Invite and collaberate on documents by inviting them",
  },
];

export const HomeFeatures: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <section className="max-w-2xl mx-4">
        <h1 className="font-extrabold text-center text-4xl mb-10">
          Powerful inside,
          <br />
          Simple Outside
        </h1>
        <div className="grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 gap-x-12 gap-y-10">
          {features.map((props, i) => (
            <Feature {...props} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

type FeatureProps = {
  Icon: React.FC<IconProps>;
  title: string;
  content: string;
};

const Feature: React.FC<FeatureProps> = ({ Icon, title, content }) => {
  return (
    <div className="flex items-center">
      <Icon className="stroke-dark-blue mr-3" size={70} strokeWidth={1} />
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-gray-500">{content}</p>
      </div>
    </div>
  );
};
