"use client";

import { useSession } from 'next-auth/react';
import { CgNotes } from "react-icons/cg";
import Link from 'next/link';

export default function Note() {

    const { data: session } = useSession();

    return (
        <>
            {session?.user ?
                <Link href="/dashboard">
                    <div className="fixed bottom-0 left-0 m-5 flex flex-col items-center cursor-pointer">
                        <div className="w-[50px] h-[50px] bg-red-500 rounded-full flex flex-col items-center justify-center text-[25px]">
                            <CgNotes />
                        </div>
                        <h3 className="text-white text-[14px] mt-1">
                            Notas
                        </h3>
                    </div>
                </Link>
                : null
            }
        </>
    );
}