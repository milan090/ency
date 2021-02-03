import React, { useEffect, useState } from "react";
import AppBar from "../../components/appbar/appbar.component";
import RightBar from "../../components/right-bar/right-bar.component";
import getDate from "../../utils/getDate";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth.provider";
import CreateProjectModal from "components/create-project-modal/create-project-modal.component";
import ProjectsPreview from "components/projects-preview/projects-preview.component";
import { auth } from "config/firebase";
import { Plus } from "react-feather";

export default function Dashboard(): JSX.Element {
  const [createProjectIsHidden, setCreateProjectIsHidden] = useState(true);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user.uid && !isLoading) {
      router.push("/sign-in");
    }
  }, [isLoading, router, user]);

  return (
    <div className="bg-gray-200 flex justify-between min-h-screen overflow-y-hidden">
      <AppBar />
      <div className="py-8 w-full px-10 max-h-screen overflow-y-scroll">
        <div className="text-md text-gray-500 mb-3">{getDate()}</div>
        <div className="mb-8 flex justify-between">
          <h2 className="text-3xl">Good Morning, {user.name}!</h2>
          {user.isVerified && (
            <div>
              <AddButton onClick={() => setCreateProjectIsHidden(false)} />
              <CreateProjectModal
                isHidden={createProjectIsHidden}
                setIsHidden={setCreateProjectIsHidden}
              />
            </div>
          )}
        </div>
        <ProjectSection />
      </div>
      <RightBar />
    </div>
  );
}

const ProjectSection: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-10 pb-52  bg-white rounded-xl w-full break-all ">loading..</div>;
  } else if (!user.isVerified) {
    return (
      <div className="p-10 pb-52  bg-white rounded-xl w-full break-all ">
        <UserNotVerifiedView />
      </div>
    );
  }
  return (
    <div className="p-10 pb-52  bg-white rounded-xl w-full break-all ">
      <ProjectsPreview />
    </div>
  );
};

const UserNotVerifiedView: React.FC = () => {
  const resendConfirmationEmail = (): void => {
    auth.currentUser?.sendEmailVerification({
      url: `${location.protocol}//${location.host}/dashboard?confirm_email=true`,
    });
  };

  return (
    <div>
      <p className="font-bold">Thank you for signing up</p>
      <br />
      <p>You have not confirmed your email yet.</p>
      <p>
        Check your inbox for an email verification mail. <br /> <br />
      </p>
      <p>
        Do check your <span className="font-semibold">spam</span> folder too.
      </p>
      <br />
      <a
        className="text-blue-500 cursor-pointer hover:underline"
        onClick={resendConfirmationEmail}
        href="#"
      >
        Send Confirmation email again
      </a>
    </div>
  );
};

type AddButtonProps = {
  onClick: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <button
      className="group rounded-full shadow-xl w-10 h-10 bg-black hover:bg-white transition-all duration-300 ease-in-out hover:text-black focus:outline-none outline-none"
      {...props}
    >
      <Plus className="mx-auto stroke-white group-hover:stroke-black" size="26" strokeWidth="3.2" />
    </button>
  );
};
