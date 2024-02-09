import Link from "next/link";
import { FaTrash, FaShare } from "react-icons/fa";

import { db } from "@/services/firebaseConnection";
import {
    deleteDoc,
    doc,
} from 'firebase/firestore';

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

    async function handleShare(id: string) {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`);
    }

    async function handleDelete(id: string) {
        const taskRef = doc(db, 'tasks', id);
        await deleteDoc(taskRef);
    }

    return (
        <div className="bg-[#141414] rounded-md mb-3 py-7 px-6">
            <div className="flex justify-between items-center">
                <div className="items-start">

                    {isPublic ?
                        <Link href={`/task/${id}`}>
                            <p className="w-fit bg-gray-700 text-white text-[12px] py-1 px-1 rounded-md mb-3">
                                Pública
                            </p>
                        </Link>
                        : null}
                    <p className="text-white text-justify">
                        {task}
                    </p>
                </div>
                <div>
                    <FaTrash
                        className="ml-[50px] cursor-pointer text-gray-600 hover:text-gray-700 transition-all duration-300 ease-in-out"
                        size={20}
                        onClick={() => handleDelete(id)}
                    />
                    {isPublic ?
                        <FaShare
                            className="ml-[50px] mt-3 cursor-pointer text-gray-600 hover:text-gray-700 transition-all duration-300 ease-in-out"
                            size={20} 
                            onClick={() => handleShare(id)}
                            />
                        : null}
                </div>
            </div>
        </div>
    )
}