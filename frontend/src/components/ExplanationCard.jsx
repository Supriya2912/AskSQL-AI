import { Lightbulb } from "lucide-react";

function ExplanationCard({ explanation }) {

    return (

        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl mt-5 p-5">

            <div className="flex items-center mb-3">

                <Lightbulb className="text-yellow-500 mr-2"/>

                <h3 className="font-bold">

                    Explanation

                </h3>

            </div>

            <p className="whitespace-pre-wrap">

                {explanation}

            </p>

        </div>

    );

}

export default ExplanationCard;