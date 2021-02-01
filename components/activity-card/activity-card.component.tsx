import React from "react";
import { Check, Trash2 } from "react-feather";
import { Activity } from "types/project,types";

type Props = {
  activity: Activity;
};

const ActivityCard: React.FC<Props> = ({ activity }) => {
  const handleCheck = (): void => {
    activity.ref
      .update({
        isCompleted: !activity.isCompleted,
      })
      .catch((error) => {
        console.error(error);
        alert("Oops something went wrong");
      });
  };

  const handleDelete = (): void => {
    activity.ref.delete().catch((error) => {
      console.error(error);
      alert("Oops something went wrong");
    });
  };
  return (
    <div className="rounded-md bg-gray-300 w-full min-h-10 my-3 py-2 px-2 group">
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="h-6 w-6 mt-0.5">
            <button
              className="border-primary border-2 h-5 w-5 rounded-sm outline-none focus:outline-none group-hover:block"
              onClick={handleCheck}
            >
              {activity.isCompleted && <Check size="18px" />}
            </button>
          </div>
          <span
            className={`ml-2 w-60 break-words ${
              activity.isCompleted && "line-through text-gray-600"
            }`}
          >
            {activity.name}
          </span>
        </div>
        <div className="w-6 h-6">
          <button onClick={handleDelete}>
            <Trash2
              className="stroke-red-500 hidden group-hover:block transition duration-150 ease-in-out cursor-pointer"
              size="20px"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
