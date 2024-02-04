"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';


export default function Header() {

    const { data: session, status } = useSession();

    const name = session?.user?.name;
    //const name = "Teste";
    return (
        <div className="w-full fixed top-0 h-20 px-[30px] flex items-center justify-between md:px-[100px]">
            <Link href="/">
                <h1 className="text-[30px] font-bold text-white">Tarefas<span className="text-red-500">+</span></h1>
            </Link>
            {status === "loading" ? (
                <></>
            ) : session ? (
                <button
                    className="min-w-[140px] text-white border-[1px] rounded-full p-[5px] text-center"
                    onClick={() => signOut()}
                >
                    Olá {name}
                </button>
            ) : (
                <button
                    className="min-w-[140px] text-white border-[1px] rounded-full p-[5px] text-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                    onClick={() => signIn("google")}
                >
                    Acessar
                </button>
            )
            }
        </div>
    );
}