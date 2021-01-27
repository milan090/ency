import React, { useEffect, useState } from "react";
import CustomInput from "components/custom-input/custom-input.component";
import ModalContainer from "components/modal-container/modal-container.component";
import CustomButton from "components/custom-button/custom-button.component";
import { useForm } from "react-hook-form";
import { db } from "config/firebase";
import { useAuth } from "hooks/useAuth.provider";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";
import { createDefaultActivites, getAITips } from "utils/createProject";
import { useChat } from "hooks/useChat";

type Props = {
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

type CreateProjectFormInputs = {
  name: string;
};

const CreateProjectModal: React.FC<Props> = ({ isHidden, setIsHidden }) => {
  const { register, handleSubmit, errors } = useForm<CreateProjectFormInputs>();
  const [isCreating, setIsCreating] = useState(false);
  const [AITipsEnabled, setAITipsEnabled] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { addMessage } = useChat();

  useEffect(() => {
    return () => {
      setIsCreating(false);
    };
  }, [AITipsEnabled]);

  const onSubmit = async (data: CreateProjectFormInputs): Promise<void> => {
    if (!user.uid) return alert("Oops somethign went wrong! Try again in few minutes");
    if (isCreating) return;
    setIsCreating(true);
    const userRef = db.collection("users").doc(user.uid);
    const projectRef = userRef.collection("projects").doc();
    try {
      const batch = db.batch();
      batch.set(projectRef, {
        name: data.name,
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
      });
      await createDefaultActivites(projectRef, batch);

      if (AITipsEnabled) {
        const aiTips = await getAITips(data.name);

        aiTips.contentBlocks.forEach((contentBlock) => {
          const docRef = projectRef.collection("contentBlocks").doc();
          batch.set(docRef, contentBlock);
        });

        const suggestedArticleNodes = (
          <div>
            <p>
              Hey there! Its me Ency! I found these cool articles, thought you might find them
              useful
            </p>
            <ul className="flex flex-col break-words list-inside list-disc">
              {aiTips.recommendedArticles.slice(0, 4).map((articleLink, i) => {
                const tmp = articleLink.split("/");
                const articleName = tmp[tmp.length - 1].replace(/_/g, " ");
                return (
                  <li key={i}>
                    <a
                      href={articleLink}
                      className="hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {articleName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
        setTimeout(() => {
          addMessage({
            content: suggestedArticleNodes,
            date: new Date(),
            from: "BOT",
          });
        }, 5000);
      }
      await batch.commit();
      router.push(`/dashboard/project/${projectRef.id}`);
    } catch (error) {
      alert("Sorry creating project failed");
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div>
      <ModalContainer isHidden={isHidden} setIsHidden={setIsHidden} title="Create New Project">
        <form noValidate>
          <CustomInput
            fref={register({
              required: "This field is required",
            })}
            error={errors.name?.message}
            label="Project Name"
            name="name"
            placeHolder="Enter Project Name"
            type="text"
            textSize="base"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <div>
            <input
              type="checkbox"
              id="aiTips"
              className="mr-2 cursor-pointer"
              defaultChecked
              onChange={(e) => setAITipsEnabled(e.target.checked)}
            />
            <label htmlFor="aiTips" className="text-gray-400">
              Give me AI generated Tips (will take 10-20 sec)
            </label>
          </div>
          <CustomButton className="float-right mt-3 w-28" onClick={handleSubmit(onSubmit)}>
            {isCreating ? (
              <div className="w-full flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              "Create"
            )}
          </CustomButton>
        </form>
      </ModalContainer>
    </div>
  );
};

export default CreateProjectModal;
