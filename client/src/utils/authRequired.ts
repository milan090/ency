import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { getURL } from "src/server/getURL";

export function authRequired<T>(getServerSideProps?: GetServerSideProps<T>): GetServerSideProps {
  if (!getServerSideProps) {
    const wrapper: GetServerSideProps = async (ctx) => {
      const { req } = ctx;
      const session = await getSession({ req });

      if (!session?.user.id) {
        return {
          redirect: {
            permanent: false,
            destination: `/login?redirectURL=${getURL()}${req.url}`,
          },
        };
      }
      return {
        props: {},
      };
    };
    return wrapper;
  }
  const wrapper: GetServerSideProps<T> = async (ctx) => {
    const { req } = ctx;
    const session = await getSession({ req });

    if (!session?.user.id) {
      return {
        redirect: {
          permanent: false,
          destination: `/login?redirectURL=${req.url}`,
        },
      };
    }

    return await getServerSideProps(ctx);
  };

  return wrapper;
}
