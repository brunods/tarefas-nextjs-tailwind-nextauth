"use client";

import '../../assets/styles/globals.css'
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextAuthProvider } from "../../app/providers";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

//components
import Header from '@/components/header';
import Note from '@/components/note';
import TextArea from '@/components/textarea';
import ButtonPrimary from '@/components/buttonPrimary';
import Task from '@/components/task';

//importe database
import { db } from '@/services/firebaseConnection';
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot
} from 'firebase/firestore';

interface HomeProps {
    user: {
        email: string;
    }
}

interface TaskProps {
    id: string;
    task: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function Dashboard({ user }: HomeProps) {

    const [inputText, setInputText] = useState<string>("");
    const [publicTask, setPublicTask] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    useEffect(() => {
        async function getTasks() {
            const taskRef = collection(db, "tasks");
            const q = query(taskRef, where("user", "==", user.email), orderBy("createdAt", "desc"));

            onSnapshot(q, (snapshot) => {
                let list = [] as TaskProps[];

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        task: doc.data().task,
                        isPublic: doc.data().isPublic,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt
                    });
                });

                setTasks(list);
            });
        }
        getTasks();
    }, [inputText, publicTask]);



    function handlePublicTask(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked);
    }


    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (inputText === "") {
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                task: inputText,
                isPublic: publicTask,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: user.email
            });

            setInputText("");
            setPublicTask(false);

            alert("Tarefa registrada com sucesso!");

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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
                        <form onSubmit={handleRegisterTask} >
                            <TextArea
                                placeholder="Escreva aqui a sua tarefa..."
                                value={inputText}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                    setInputText(event.target.value)}
                            />
                            <div className="flex items-center my-4">
                                <input
                                    type="checkbox"
                                    name="isPublic"
                                    id="isPublic"
                                    className="w-5 h-5"
                                    checked={publicTask}
                                    onChange={handlePublicTask}

                                />
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
                            {
                                tasks.map((task) => {
                                    return (
                                        <Task
                                            id={task.id}
                                            task={task.task}
                                            isPublic={task.isPublic}
                                            createdAt={task.createdAt}
                                            updatedAt={task.updatedAt}
                                        />
                                    )
                                })
                            }
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
        props: {
            user: {
                email: session?.user?.email,
            }
        }
    };
}