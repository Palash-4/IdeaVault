import Link from "next/link";
import IdeaCard from "./IdeaCard";

const TrendingIdeas = ({ ideas }) => {

    return (
        <section className="bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase">
                            Top Rated
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                            Trending Ideas
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                            Discover innovative startup concepts shared by creators and entrepreneurs from around the world.
                        </p>
                    </div>
                    <Link
                        href="/ideas"
                        className="inline-flex items-center gap-3 text-cyan-500 font-black text-lg hover:gap-5 transition-all duration-300"
                    >
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {
                        ideas.slice(0, 6).map((idea) => (
                            <div
                                key={idea._id}
                                className="group"
                            >
                                <div className="transform group-hover:-translate-y-2 transition-all duration-500">
                                    <IdeaCard
                                        idea={idea}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-16 flex justify-center sm:hidden">
                    <Link
                        href="/ideas"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
                    >
                        Explore More Ideas
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TrendingIdeas;