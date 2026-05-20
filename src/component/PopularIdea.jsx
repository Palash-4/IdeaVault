"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    FaBrain,
    FaBookOpen,
    FaBriefcase,
    FaDollarSign,
    FaHeartbeat,
    FaMicrochip,
} from "react-icons/fa";

const iconMap = {
    Tech: FaMicrochip,
    AI: FaBrain,
    Health: FaHeartbeat,
    Education: FaBookOpen,
    Finance: FaDollarSign,
    Productivity: FaBriefcase,
};

const PopularCategories = () => {
    const [ideas, setIdeas] = useState([]);
    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`);
                const data = await res.json();
                setIdeas(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIdeas();
    }, []);

    const categories = [
        ...new Set(
            ideas.map(
                (idea) =>
                    idea.category
            )
        ),
    ];

    return (
        <section className="bg-slate-50  dark:bg-slate-950 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase">
                        Explore Topics
                    </div>
                    <h2 className="mt-5 text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                        Popular Categories
                    </h2>
                    <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Explore startup concepts across various industries and discover innovative opportunities.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
                    {
                        categories.map(
                            (
                                category,
                                index
                            ) => {
                                const Icon = iconMap[category] || FaMicrochip;
                                return (
                                    <div
                                        key={index}
                                        className="group bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:bg-gradient-to-br transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                                    >
                                        <div className="w-20 h-20 rounded-3xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-500 group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                                            <Icon
                                                size={
                                                    38
                                                }
                                            />
                                        </div>
                                        <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white group-hover:text-white transition-all duration-500">
                                            {
                                                category
                                            }
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-100 transition-all duration-500">

                                            Browse Ideas
                                        </p>
                                    </div>
                                );
                            }
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;