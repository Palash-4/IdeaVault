"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import toast from "react-hot-toast";


const AddIdeaPage = () => {
    const { data: session, } = authClient.useSession();
    const user = session?.user;
    const [isPending, setIsPending] = useState(false);

    const handleAddIdea = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const formData = new FormData(e.currentTarget);
            const formValues =
                Object.fromEntries(
                    formData.entries()
                );

            const idea = {
                ...formValues,
                userEmail: user?.email,
                userName: user?.name,
                userImage: user?.image,
                createdAt: new Date(),
            };

            console.log(idea)

            const {data:tokenData} = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
                method: 'POST',
                headers: {"content-type": 'application/json',
                authorization: `Bearer ${tokenData?.token}`,

                },
                body: JSON.stringify(idea)
            })

            const data = await res.json()
            console.log(data);


            if (data.insertedId || data.success) {
                toast.success(
                    "Idea Published Successfully!"
                );

                e.target.reset();
            } else {
                toast.error(
                    "Failed To Publish Idea"
                );
            }
        } catch (error) {
            console.log(error);

            toast.error("Something went wrong");
        } finally {
            setIsPending(false);
        }

    };

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">

                    <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-5">
                        STARTUP INNOVATION
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        Share Your Startup Idea
                    </h1>

                    <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Publish your innovative idea, receive
                        valuable community feedback, and inspire
                        future entrepreneurs worldwide.
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">

                    <div className="h-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>
                    <form
                        onSubmit={handleAddIdea}
                        className="p-6 sm:p-8 lg:p-10 space-y-8"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Idea Title */}
                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Idea Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="AI Powered Study Assistant"
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    required
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="AI">
                                        AI
                                    </option>

                                    <option value="Technology">
                                        Technology
                                    </option>

                                    <option value="Health">
                                        Health
                                    </option>

                                    <option value="Education">
                                        Education
                                    </option>

                                    <option value="Finance">
                                        Finance
                                    </option>

                                    <option value="Business">
                                        Business
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Estimated Budget ($)
                                </label>

                                <input
                                    type="number"
                                    name="estimatedBudget"
                                    placeholder="5000"
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Idea Image URL
                                </label>

                                <input
                                    type="url"
                                    name="imageURL"
                                    required
                                    placeholder="https://example.com/idea-image.jpg"
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Short Description
                                </label>

                                <textarea
                                    name="shortDescription"
                                    required
                                    rows={4}
                                    placeholder="Write a short summary of your startup idea..."
                                    className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-cyan-500"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Detailed Description
                                </label>

                                <textarea
                                    name="detailedDescription"
                                    required
                                    rows={6}
                                    placeholder="Explain your startup idea in detail..."
                                    className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-cyan-500"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Target Audience
                                </label>

                                <input
                                    type="text"
                                    name="targetAudience"
                                    required
                                    placeholder="Students, freelancers, startup founders..."
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Problem Statement
                                </label>

                                <textarea
                                    name="problemStatement"
                                    required
                                    rows={5}
                                    placeholder="What problem does your idea solve?"
                                    className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-cyan-500"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Proposed Solution
                                </label>

                                <textarea
                                    name="proposedSolution"
                                    required
                                    rows={5}
                                    placeholder="Describe your proposed solution..."
                                    className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-cyan-500"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Tags (Optional)
                                </label>

                                <input
                                    type="text"
                                    name="tags"
                                    placeholder="AI, Startup, SaaS, Productivity"
                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white py-5 rounded-2xl text-lg font-bold shadow-lg hover:scale-[1.01] disabled:opacity-70"
                        >
                            {isPending
                                ? "Publishing Idea..."
                                : "Publish Startup Idea"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddIdeaPage;