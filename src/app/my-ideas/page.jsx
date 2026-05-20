"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import IdeaCard from "@/component/IdeaCard";
import { authClient } from "@/lib/auth-client";

const MyIdeasPage = () => {

    const { data: session, } = authClient.useSession();
    const user = session?.user;
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription,] = useState("");
    const [editAudience, setEditAudience,] = useState("");

    useEffect(() => {
        if (!user?.email) return;
        const fetchIdeas =
            async () => {
                try {
                    const {data:tokenData} = await authClient.token();
                    const res =await fetch(`http://localhost:5000/my-ideas/${user.email}`,
                            {
                                headers: {
                                    authorization: `Bearer ${tokenData?.token}`,
                                },
                            }
                        );
                    const data = await res.json();

                    console.log(data);

                    setIdeas(
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
        fetchIdeas();
    }, [user]);

    const handleDelete =
        async (id) => {
            const result =
                await Swal.fire({
                    title: "Delete Idea?",
                    text: "This action cannot be undone.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ef4444",
                    confirmButtonText: "Delete",
                });
            if (!result.isConfirmed)
                return;
            try {
                const {data:tokenData} = await authClient.token();
                const res =await fetch(`http://localhost:5000/ideas/${id}`,
                        {
                            method:
                                "DELETE",
                            headers: {
                                authorization: `Bearer ${tokenData?.token}`,
                            },
                        }
                    );
                const data = await res.json();
                if (
                    data.deletedCount > 0
                ) {
                    Swal.fire(
                        "Deleted!",
                        "Idea deleted successfully.",
                        "success"
                    );
                    setIdeas(
                        ideas.filter(
                            (idea) =>
                                idea._id !== id
                        )
                    );
                }
            } catch (error) {

                console.log(error);
            }
        };
    const handleEditClick =
        (idea) => {
            setSelectedIdea(idea);
            setEditTitle(
                idea.title
            );
            setEditDescription(
                idea.shortDescription
            );
            setEditAudience(
                idea.targetAudience
            );
        };

    const handleUpdate =
        async () => {
            try {
                const updatedIdea = {
                    title: editTitle,
                    shortDescription:
                        editDescription,
                    targetAudience:
                        editAudience,
                };

                const {data:tokenData} = await authClient.token();

                const res = await fetch(`http://localhost:5000/ideas/${selectedIdea._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "content-type": 'application/json',
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                        body: JSON.stringify(
                            updatedIdea
                        ),
                    }
                );

                const data = await res.json();
                if (
                    data.modifiedCount > 0
                ) {
                    Swal.fire(
                        "Updated!",
                        "Idea updated successfully.",
                        "success"
                    );
                    setIdeas(
                        ideas.map((idea) =>
                            idea._id ===
                                selectedIdea._id
                                ? {
                                    ...idea,
                                    ...updatedIdea,
                                }
                                : idea
                        )
                    );
                    setSelectedIdea(null);
                }
            } catch (error) {
                console.log(error);
            }
        };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-14">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                        My Ideas
                    </h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Manage and edit your submitted startup concepts.
                    </p>
                </div>

                {
                    ideas.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 py-24 text-center">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                                No Ideas Found
                            </h2>
                            <p className="mt-4 text-slate-600 dark:text-slate-400">
                                You have not added any ideas yet.
                            </p>
                        </div>

                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                ideas.map((idea) => (
                                    <div
                                        key={idea._id}
                                        className="relative"
                                    >
                                        <div className="absolute top-4 right-4 z-20 flex gap-3">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(
                                                        idea
                                                    )
                                                }
                                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow text-black dark:text-white font-semibold"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        idea._id
                                                    )
                                                }
                                                className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <IdeaCard
                                            idea={idea}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                selectedIdea && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-xl">
                            <h2 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                                Edit Idea
                            </h2>
                            <div className="space-y-5">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-2xl px-5 py-4 text-slate-900 dark:text-white"
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-2xl px-5 py-4 text-slate-900 dark:text-white"
                                />
                                <textarea
                                    value={editAudience}
                                    onChange={(e) =>
                                        setEditAudience(
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-2xl px-5 py-4 text-slate-900 dark:text-white"
                                />
                                <div className="flex flex-col sm:flex-row gap-4">

                                    <button
                                        onClick={
                                            handleUpdate
                                        }
                                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-2xl font-bold"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedIdea(
                                                null
                                            )
                                        }
                                        className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white py-4 rounded-2xl font-bold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default MyIdeasPage;