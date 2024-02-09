import Link from "next/link";
import { FaTrash, FaShare } from "react-icons/fa";

interface TaskProps {
    id: string;
    task: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function Task({
    id,
    task,
    isPublic,
    createdAt,
    updatedAt
}: TaskProps) {
    return (
        <div className="bg-[#141414] rounded-md mb-3 py-7 px-6">
            <div className="flex justify-between items-center">
                <div className="items-start">

                    {isPublic ?
                        <Link href={`/task/${id}`}>
                            <p className="w-fit bg-gray-700 text-white text-[12px] py-1 px-1 rounded-md mb-3">
                                Pública <FaShare className="inline-block ml-2" size={12} />
                            </p>
                        </Link>
                        : null}
                    <p className="text-white text-justify">
                        {task}
                    </p>
                </div>
                <FaTrash
                    className="ml-[50px] cursor-pointer text-gray-600 hover:text-gray-700 transition-all duration-300 ease-in-out"
                    size={20}
                />
            </div>
        </div>
    )
}