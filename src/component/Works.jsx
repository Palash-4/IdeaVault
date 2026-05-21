import { BsPeople } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import { GrWorkshop } from "react-icons/gr";

const WorkPage = () => {
    return (
        <section className="bg-slate-50 dark:bg-slate-950 py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Your journey from an abstract concept to a validated startup idea.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition">
                        <div className="w-24 h-24 mx-auto rounded-3xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-500 text-4xl">
                            <FcIdea></FcIdea>
                        </div>
                        <h3 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                            Share Your Idea
                        </h3>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Submit your startup concept with all the details and pitch your vision.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition">
                        <div className="w-24 h-24 mx-auto rounded-3xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-500 text-4xl">
                            <BsPeople></BsPeople>
                        </div>
                        <h3 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                            Get Feedback
                        </h3>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Receive comments, suggestions, and validation from the community.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition">
                        <div className="w-24 h-24 mx-auto rounded-3xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-500 text-4xl">
                            <GrWorkshop></GrWorkshop>
                        </div>
                        <h3 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                            Watch It Grow
                        </h3>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Track likes and engagement as your idea gains real traction.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WorkPage;