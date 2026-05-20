import Image from "next/image";
import Link from "next/link";
import { CheckmarkIcon } from "react-hot-toast";
import CommentSection from "@/component/CommentSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const IdeaDetailsPage = async ({params}) => {
    const { id } = await params;
    const {token} =await auth.api.getToken({
        headers: await headers(),
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,
        {
            headers: {
                authorization:`Bearer ${token}`
            },

            cache:
                "no-store",
        }
    );

    const idea = await res.json();

    const {
        title,
        category,
        imageURL,
        shortDescription,
        detailedDescription,
        targetAudience,
        problemStatement,
        proposedSolution,
        estimatedBudget,
        tags,
    } = idea;

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

                        <Image
                            src={imageURL}
                            alt={title || "Idea Image" }
                            width={900}
                            height={600}
                            className="w-full h-[500px] object-cover"
                        />

                        <div className="absolute top-6 left-6">

                            <span className="bg-white/90 backdrop-blur-md text-cyan-600 px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                                {category}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6">
                            STARTUP IDEA DETAILS
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                            {title}
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            {shortDescription}
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                $
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Estimated Budget
                                </p>

                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                    ${estimatedBudget}
                                </h3>
                            </div>
                        </div>
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Target Audience
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {targetAudience}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">

                            {tags?.split(",").map((tag, i) => (
                                <span
                                    key={i}
                                    className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>

                        <Link
                            href="/ideas"
                            className="inline-flex items-center gap-3 mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
                        >
                            Back To Ideas
                        </Link>
                    </div>
                </div>
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">

                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">

                        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-3xl mb-6">
                            !
                        </div>

                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-5">
                            Problem Statement
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            {problemStatement}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">

                        <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 text-3xl mb-6">
                            <CheckmarkIcon></CheckmarkIcon>
                        </div>

                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-5">
                            Proposed Solution
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            {proposedSolution}
                        </p>
                    </div>
                </div>

                <div className="mt-12 bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">

                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8">
                        Detailed Description
                    </h2>

                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                        {detailedDescription}
                    </p>
                </div>
                <CommentSection ideaId={id} idea={idea}/>
            </div>
        </section>
    );
};

export default IdeaDetailsPage;