"use client";

import '../../assets/styles/globals.css'
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextAuthProvider } from "../../app/providers";
import Head from "next/head";

//components
import Header from '@/components/header';
import Note from '@/components/note';
import TextArea from '@/components/textarea';
import ButtonPrimary from '@/components/buttonPrimary';
import Task from '@/components/task';



export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <NextAuthProvider>
                <div className="bg-[#0F0F0F] flex flex-col w-full min-h-[100vh]">
                    <Header />
                    <div className="w-full px-[30px] md:px-[100px]">
                        <h1 className="text-white text-[20px] font-extrabold md:text-[30px]">
                            Qual é a sua tarefa?
                        </h1>
                        <form action="#">
                            <TextArea
                                placeholder="Escreva aqui a sua tarefa..."
                                id="newTaskText"
                            />
                            <div className="flex items-center my-4">
                                <input type="checkbox" name="isPublic" id="isPublic" className="w-5 h-5" />
                                <label htmlFor="isPublic" className="text-white ml-3">
                                    Deixar tarefa pública
                                </label>
                            </div>
                            <ButtonPrimary>
                                Registrar
                            </ButtonPrimary>
                        </form>
                    </div>
                    <div className="w-full mt-10 text-center px-[30px] md:px-[100px]">
                        <h1 className="text-white text-[20px] font-extrabold mt-12 mb-8 md:text-[30px]">Minhas Tarefas</h1>
                        <div>
                            <Task
                                id="1"
                                description="lauren ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, facilisis nisl. Donec sit amet ligula sit amet odio fermentum tincidunt"
                                isPublic={true}
                                createdAt="2021-09-15T00:00:00.000Z"
                                updatedAt="2021-09-15T00:00:00.000Z"
                            />
                            <Task
                                id="2"
                                description="lauren ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, facilisis nisl. Donec sit amet ligula sit amet odio fermentum tincidunt"
                                isPublic={true}
                                createdAt="2021-09-15T00:00:00.000Z"
                                updatedAt="2021-09-15T00:00:00.000Z"
                            />
                            <Task
                                id="3"
                                description="lauren ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, facilisis nisl. Donec sit amet ligula sit amet odio fermentum tincidunt"
                                isPublic={false}
                                createdAt="2021-09-15T00:00:00.000Z"
                                updatedAt="2021-09-15T00:00:00.000Z"
                            />
                        </div>
                    </div>
                    <Note />
                </div>
            </NextAuthProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
}