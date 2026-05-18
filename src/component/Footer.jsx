import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-md">
                                <span className="text-white font-black text-xl">
                                    I
                                </span>
                            </div>

                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                    IdeaVault
                                </h1>

                                <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                                    Share  Validate  Build
                                </p>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
                            Platform
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    href="/"
                                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/ideas"
                                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition"
                                >
                                    Ideas
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/add-idea"
                                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition"
                                >
                                    Add Idea
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-ideas"
                                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition"
                                >
                                    My Ideas
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
                            Contact
                        </h3>

                        <div className="space-y-3 text-slate-600 dark:text-slate-400">

                            <p>
                                Dhaka, Bangladesh
                            </p>

                            <p>
                                admin@ideavault.com
                            </p>

                            <p>
                                +880 1234-567890
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
                            Connect
                        </h3>
                        <div className="flex items-center flex-wrap gap-4">
                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition text-slate-700 dark:text-slate-300"
                            >
                                <FaFacebookF size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition text-slate-700 dark:text-slate-300"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition text-slate-700 dark:text-slate-300"
                            >
                                <FaLinkedinIn size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition text-slate-700 dark:text-slate-300"
                            >
                                <FaXTwitter size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition text-slate-700 dark:text-slate-300"
                            >
                                <FaGithub size={18} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 mt-14 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="flex gap-2 text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
                        <CopyrightIcon></CopyrightIcon> 2026 IdeaVault. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">

                        <Link
                            href="#"
                            className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="#"
                            className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;