"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const CommentSection = ({ ideaId, idea }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const { data: session } = authClient.useSession();

    const user = session?.user;
    useEffect(() => {
        fetch(`http://localhost:5000/comments/${ideaId}`)
            .then((res) => res.json())
            .then((data) => setComments(data));

    }, [ideaId]);
    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText) {
            return toast.error(
                "Write a comment first"
            );
        }
        setIsPending(true);


        const commentData = {
            ideaId,
            ideaTitle: idea.title,
            userName: user?.name,
            userEmail: user?.email,
            userImage: user?.image,
            comment: commentText,
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:5000/comments",
                {
                    method: "POST",
                    headers: {
                        "content-type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        commentData
                    ),
                }
            );
            const data = await res.json();
            if (data.insertedId) {
                toast.success(
                    "Comment Added Successfully"
                );
                setComments([
                    ...comments,
                    {
                        ...commentData,
                        _id: data.insertedId,
                    },
                ]);
                setCommentText("");
            }
        } catch (error) {
            console.log(error);
            toast.error(
                "Failed to add comment"
            );
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/comments/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();
            if (data.deletedCount > 0) {
                toast.success(
                    "Comment Deleted"
                );
                const remaining =
                    comments.filter(
                        (comment) =>
                            comment._id !== id
                    );
                setComments(remaining);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                "Delete Failed"
            );
        }
    };
    const handleEdit = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/comments/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        comment: editText,
                    }),
                }
            );
            const data = await res.json();
            if (data.modifiedCount > 0) {
                toast.success(
                    "Comment Updated"
                );
                const updatedComments =
                    comments.map((item) => {
                        if (item._id === id) {
                            return {
                                ...item,
                                comment: editText,
                            };
                        }
                        return item;
                    });
                setComments(updatedComments);
                setEditingId(null);
                setEditText("");
            }
        } catch (error) {
            console.log(error);
            toast.error(
                "Update Failed"
            );
        }
    };

    return (
        <div className="mt-14 bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="mb-8">
                <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-4">
                    COMMUNITY INTERACTION
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    Comments ({comments.length})
                </h2>
            </div>
            <form
                onSubmit={handleComment}
                className="space-y-5"
            >
                <textarea
                    value={commentText}
                    onChange={(e) =>
                        setCommentText(e.target.value)
                    }
                    placeholder="Share your feedback about this startup idea..."
                    rows={5}
                    className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-6 py-5 outline-none resize-none text-slate-800 dark:text-white focus:ring-2 focus:ring-cyan-500"
                ></textarea>
                <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold shadow-lg"
                >Post Comment
                </button>
            </form>
            <div className="mt-12 space-y-6">
                {comments.length === 0 ? (
                    <div className="text-center py-10 rounded-3xl bg-slate-100 dark:bg-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">
                            No comments yet.
                        </p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4">
                                {
                                    comment.userImage ? (
                                        <img src={
                                            comment.userImage
                                        }
                                            alt={
                                                comment.userName
                                            }
                                            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                                        />

                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                            {comment.userName?.charAt(0)}
                                        </div>
                                    )
                                }
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                        {comment.userName}
                                    </h4>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Community Member
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5">
                                {editingId === comment._id ? (
                                    <div className="space-y-4">
                                        <textarea
                                            value={editText}
                                            onChange={(e) =>
                                                setEditText(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none text-slate-800 dark:text-white"
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        comment._id
                                                    )
                                                }
                                                className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl font-semibold"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditText("");
                                                }}
                                                className="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-white px-5 py-2 rounded-xl font-semibold"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {comment.comment}
                                        </p>
                                        <div className="flex gap-5 mt-5">

                                            <button
                                                onClick={() => {
                                                    setEditingId(
                                                        comment._id
                                                    );

                                                    setEditText(
                                                        comment.comment
                                                    );
                                                }}
                                                className="text-cyan-600 font-semibold hover:underline"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        comment._id
                                                    )
                                                }
                                                className="text-red-500 font-semibold hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;