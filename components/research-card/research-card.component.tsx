import React from "react"
import CustomButton from "../custom-button/custom-button.component";

interface props {
    title: string,
    description?: string,
    date?: string
}

const ResearchCard: React.FC<props> = ({ title, description, date, ...props }) => {

    return (
        <div className="flex-col space-y-2 border-primary rounded-lg border-l-8 p-3 px-4 bg-gray-200">
            <div className="font-bold text-xl">
                {title}

            </div>
            <div className="text-md text-gray-500">
                {description}
            </div>
            <div className="text-xs text-gray-400">
                {date}

                <CustomButton className="block ml-auto w-26 text-sm rounded-full h-9 bg-transparent">
                    Continue
            </CustomButton>
            </div>

        </div>
    )

}

export default ResearchCard;