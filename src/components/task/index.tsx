import { FaRegTrashAlt } from "react-icons/fa";

interface TaskProps {
    id: string;
    description: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function Task({
    description,
    isPublic,
    createdAt,
    updatedAt
}: TaskProps) {
    return (
        <div className="bg-[#141414] rounded-md mb-3 py-7 px-6">
            <div className="flex justify-between items-center">
                <div className="items-start">

                    {isPublic ?
                        <p className="w-fit bg-gray-700 text-white text-[12px] py-1 px-1 rounded-md mb-3">
                            Pública
                        </p>
                        : null}
                    <p className="text-white text-justify">
                        {description}
                    </p>
                </div>
                <FaRegTrashAlt
                    className="ml-[50px] cursor-pointer text-gray-600 hover:text-gray-700 transition-all duration-300 ease-in-out"
                    size={50}
                />
            </div>
        </div>
    )
}