import React, { useEffect, useState } from "react";
import AppBar from "../../components/appbar/appbar.component";
import RightBar from "../../components/right-bar/right-bar.component";
import getDate from "../../utils/getDate";
import AddButton from "../../components/add-button/add-button.component";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth.provider";
import CreateProjectModal from "components/create-project-modal/create-project-modal.component";
import ProjectsPreview from "components/projects-preview/projects-preview.component";
import { auth } from "config/firebase";

export default function Dashboard(): JSX.Element {
  const router = useRouter();
  const [createProjectIsHidden, setCreateProjectIsHidden] = useState(true);
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
  const resendConfirmationEmail = () => {
    auth.currentUser?.sendEmailVerification({
      url: `${location.protocol}//${location.host}/dashboard?confirm_email=true`,
    });
  };
  if (isLoading) {
    return <div className="p-10 pb-52  bg-white rounded-xl w-full break-all ">loading..</div>;
  }
  return (
    <div className="p-10 pb-52  bg-white rounded-xl w-full break-all ">
      {user.isVerified ? (
        <ProjectsPreview />
      ) : (
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
      )}
    </div>
  );
};
