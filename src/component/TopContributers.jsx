import { FaAward } from "react-icons/fa";


const TopContributors = () => {
    return (
        <section className="bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                            Top Contributors
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            The most active minds in our community.
                        </p>
                    </div>
                    <div className="hidden md:flex w-20 h-20 rounded-3xl bg-cyan-100 dark:bg-cyan-900/30 items-center justify-center text-cyan-500">
                        <FaAward size={40} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 flex items-center gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                        <img
                            src="https://i.ibb.co.com/DDXTJHd0/Palash.jpg"
                            alt="user"
                            className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500"
                        />
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                Hsan Al Tarek Palash
                            </h3>
                            <div className="mt-3 inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold">
                                12 ideas shared
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 flex items-center gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="user"
                            className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500"
                        />
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                Afif hossain
                            </h3>
                            <div className="mt-3 inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold">
                                8 ideas shared
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 flex items-center gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

                        <img
                            src="https://i.ibb.co.com/cSMDthW5/Whats-App-Image-2025-05-28-at-00-56-34-7daf9ede.jpg"
                            alt="user"
                            className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500"
                        />

                        <div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                Mahmud Hasan
                            </h3>

                            <div className="mt-3 inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold">

                                7 ideas shared
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopContributors;