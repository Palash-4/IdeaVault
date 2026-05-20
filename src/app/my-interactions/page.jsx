"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MyInteractionsPage = () => {
    const { data: session, } = authClient.useSession();
    const user = session?.user;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        const fetchComments = async () => {
            try {
                const {data:tokenData} = await authClient.token();
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-interactions/${user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );
                const data = await res.json();
                console.log(data);
                setComments(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Loading.......
                </h1>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-14">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                        My Interactions
                    </h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        View ideas you have commented on.
                    </p>
                </div>
                <div className="border-b border-slate-300 dark:border-slate-700 mb-8">
                    <button className="pb-4 px-6 border-b-2 border-cyan-500 text-cyan-500 font-bold text-lg">
                        Comments ({comments.length})
                    </button>
                </div>
                {
                    comments.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 py-24 text-center">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                                No Interactions Found
                            </h2>
                            <p className="mt-4 text-slate-600 dark:text-slate-400">
                                You have not commented on any ideas yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {
                                comments.map(
                                    (item) => (
                                        <div
                                            key={item._id}
                                            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8"
                                        >
                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                                {
                                                    item.ideaTitle
                                                }
                                            </h2>
                                            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
                                                {
                                                    item.comment
                                                }
                                            </p>
                                            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                                {
                                                    new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()
                                                }
                                            </p>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default MyInteractionsPage;