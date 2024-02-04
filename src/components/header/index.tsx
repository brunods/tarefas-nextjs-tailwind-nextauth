"use client";

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';


export default function Header() {

    const { data: session, status } = useSession();

    const name = session?.user?.name;

    function showTagLogged(data: boolean) {
        if(data){
            return (
                <p>Olá, <span className="font-bold text-red-500">{name}</span></p>
            )
        }else{
            return (
                <p>Sair</p>
            )
        }
    }

    const [tagLogged, setTagLogged] = useState(true);

    return (
        <div className="w-full fixed top-0 h-20 px-[30px] flex items-center justify-between md:px-[100px]">
            <Link href="/">
                <h1 className="text-[30px] font-bold text-white">Tarefas<span className="text-red-500">+</span></h1>
            </Link>
            {status === "loading" ? (
                <></>
            ) : session ? (
                <button
                    className="min-w-[140px] text-white border-[1px] rounded-full p-[5px] text-center flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                    onClick={() => signOut()}
                    onMouseOver={() => setTagLogged(false)}
                    onMouseOut={() => setTagLogged(true)}
                >
                    {/* <p>Olá, <span className="font-bold text-red-500">{name}</span></p> */}
                    {tagLogged ? showTagLogged(true) : showTagLogged(false)}
                    <img className="w-[30px] ml-2 rounded-full" src={session?.user?.image ?? 'default-image-url'} />
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