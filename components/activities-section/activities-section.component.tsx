import React, { useEffect, useState } from "react";
import { Plus } from "react-feather";
import { Activity } from "types/project,types";
import ActivityCard from "components/activity-card/activity-card.component";
import CreateActivityModal from "components/create-activity-modal/create-activity-modal.component";
import { useProject } from "hooks/useProject";

const ActivitiesSection: React.FC = () => {
  const [activites, setActivites] = useState<Activity[]>([]);
  const [createActivityModalIsHidden, setCreateActivityModalIsHidden] = useState(true);
  const { projectRef } = useProject();

  useEffect(() => {
    console.log(createActivityModalIsHidden);
  }, [createActivityModalIsHidden]);

  useEffect(() => {
    const unsubscribe = projectRef
      ?.collection("activities")
      .orderBy("createdAt", "asc")
      .onSnapshot((res) => {
        const newActivites: Activity[] = [];
        res.docs.forEach((doc) => {
          const data = doc.data();
          const newActivity: Activity = {
            name: data.name,
            createdAt: data.createdAt.toDate(),
            isCompleted: data.isCompleted,
            ref: doc.ref,
          };
          newActivites.push(newActivity);
        });
        console.log("Activites", newActivites);
        setActivites(newActivites);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [projectRef]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="font-semibold text-2xl">Activites</h3>
          <hr className="w-10 border-none h-1 bg-primary" />
        </div>
        <Plus
          className="bg-primary rounded-full stroke-white p-0.5 float-right inline cursor-pointer border-2 border-primary hover:bg-white hover:stroke-primary transition-colors duration-300 ease-in-out shadow-lg"
          size="28px"
          onClick={() => setCreateActivityModalIsHidden(!createActivityModalIsHidden)}
        />
      </div>
      <CreateActivityModal
        isHidden={createActivityModalIsHidden}
        setIsHidden={setCreateActivityModalIsHidden}
      />
      <div>
        {activites.map((activity) => (
          <ActivityCard key={activity.ref.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSection;
