"use client";

import '../../assets/styles/globals.css'
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextAuthProvider } from "../../app/providers";
import Head from "next/head";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import Header from '@/components/header';
import Note from '@/components/note';
import TextArea from '@/components/textarea';
import ButtonPrimary from '@/components/buttonPrimary';
import Commentary from '@/components/commentary';

import { db } from '@/services/firebaseConnection';
import {
    collection,
    onSnapshot,
    doc,
    getDoc,
    addDoc,
    query,
    where,
    orderBy,
} from 'firebase/firestore';

interface TaskProps {
    item: {
        task: string;
        isPublic: boolean;
        createdAt: string;
        user: string;
        name: string;
        taskId: string;
    }

    user: {
        email: string;
        name: string;
        photo: string;
    }
}

interface CommentaryProps {
    id: string;
    commentary: string;
    photo: string;
    nameCommentary: string;
    dateCommentary: string;
}

export default function Task({ item, user }: TaskProps) {

    const [inputText, setInputText] = useState<string>("");
    const [comments, setComments] = useState<CommentaryProps[]>([]);


    useEffect(() => {
        async function getComments() {
            const commentaryRef = collection(db, "comments");
            const q = query(commentaryRef, where("taskId", "==", item.taskId));

            onSnapshot(q, (snapshot) => {
                let list = [] as CommentaryProps[];

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        commentary: doc.data().commentary,
                        photo: doc.data().photo,
                        nameCommentary: doc.data().name,
                        dateCommentary: doc.data().createdAt.toDate().toLocaleDateString('pt-BR')
                    })
                });
                setComments(list);
            });
        }
        getComments();
    }, [inputText]);
                    

    async function handleSaveComment(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (inputText == "") {
            return;
        }

        try {

            const docRef = await addDoc(collection(db, "comments"), {
                commentary: inputText,
                taskId: item.taskId,
                user: item.user,
                createdAt: new Date(),
                name: user.name,
                photo: user.photo,
            });

            setInputText("");

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Head>
                <title>Detalhes da Task</title>
            </Head>
            <div className="bg-[#0F0F0F] flex flex-col w-full min-h-[100vh]">
                <NextAuthProvider>
                    <Header />
                    <div className="px-[30px] md:px-[100px]">
                        <div className="text-white flex flex-col border-[1px] rounded-lg p-6">
                            <p className='whitespace-pre-wrap'>
                                {item.task}
                            </p>
                        </div>
                        <div className="mt-3 flex">
                            <p className="text-red-500">Por <span className="bg-red-500 p-1 rounded-xl text-gray-950 ml-1">{item.name}</span></p>
                            <p className="text-blue-500"> <span className="bg-blue-500 p-1 rounded-xl text-gray-950 ml-1">{item.createdAt}</span></p>
                        </div>
                    </div>

                    <div className="px-[30px] md:px-[100px]">
                        <form className="mb-10" onSubmit={handleSaveComment}>
                            <TextArea
                                placeholder="deixe o seu comentário..."
                                value={inputText}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                    setInputText(event.target.value)}
                            />
                            <ButtonPrimary>
                                Comentar
                            </ButtonPrimary>
                        </form>
                        <div>
                        <h1 className="text-white text-[20px] font-extrabold mt-12 mb-8 md:text-[30px]">Comentários </h1>
                            {
                                comments.map((comment) => {
                                    return (
                                        <Commentary
                                            key={comment.id}
                                            commentary={comment.commentary}
                                            picture={comment.photo}
                                            nameCommentary={comment.nameCommentary}
                                            dateCommentary={comment.dateCommentary}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Note />
                </NextAuthProvider>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const id = params?.id as string;
    const session = await getSession({ req });

    const docRef = doc(db, "tasks", id);
    const snapshot = await getDoc(docRef);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if (!snapshot.exists()) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if (!snapshot.data().isPublic) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    const miliseconds = snapshot.data()?.createdAt?.seconds * 1000;

    const task = {
        task: snapshot.data()?.task,
        isPublic: snapshot.data()?.isPublic,
        createdAt: new Date(miliseconds).toLocaleDateString('pt-BR'),
        user: snapshot.data()?.user,
        name: snapshot.data()?.name,
        taskId: id,
    }

    const user = {
        email: session?.user?.email,
        name: session?.user?.name,
        photo: session?.user?.image,
    }

    //console.log(user);

    return {
        props: {
            item: task,
            user: user
        }
    }
}