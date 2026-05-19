"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [darkMode, setDarkMode] =
        useState(false);

    const {
        data: session,
    } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add(
                "dark"
            );
        }

    }, []);

    const handleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove(
                "dark"
            );
            localStorage.setItem(
                "theme",
                "light"
            );
        } else {
            document.documentElement.classList.add(
                "dark"
            );
            localStorage.setItem(
                "theme",
                "dark"
            );
        }
        setDarkMode(!darkMode);
    };

    const handleLogout = async () => {
        await authClient.signOut();
        toast.success(
            "Logout Successful"
        );
        window.location.reload();
    };

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                IdeaVault
                            </h1>

                            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 -mt-1">
                                Share Validate Build
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-10">
                        <Link
                            href="/"
                            className="text-cyan-500 font-semibold text-lg"
                        >
                            Home
                        </Link>
                        <Link
                            href="/ideas"
                            className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition font-medium text-lg"
                        >
                            Ideas
                        </Link>
                        {user && (
                            <>
                                <Link
                                    href="/add-idea"
                                    className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition font-medium text-lg"
                                >
                                    Add Idea
                                </Link>
                                <Link
                                    href="/my-ideas"
                                    className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition font-medium text-lg"
                                >
                                    My Ideas
                                </Link>
                                <Link
                                    href="/my-interactions"
                                    className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition font-medium text-lg"
                                >
                                    My Interactions
                                </Link>
                            </>
                        )}
                    </nav>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            onClick={handleTheme}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                            {darkMode ? (
                                <Sun
                                    size={18}
                                    className="text-yellow-400"
                                />
                            ) : (
                                <Moon
                                    size={18}
                                    className="text-slate-700 dark:text-white"
                                />
                            )}
                        </button>
                        {!user ? (

                            <div className="hidden lg:flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-cyan-500 font-semibold text-lg"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-7 py-3 rounded-full font-semibold shadow-md"
                                >
                                    Register
                                </Link>
                            </div>

                        ) : (

                            <div className="hidden lg:block relative group">

                                <img
                                    referrerPolicy="no-referrer"
                                    src={
                                        user?.image
                                    }
                                    alt="user"
                                    className="w-12 h-12 rounded-full border-2 border-cyan-500 cursor-pointer"
                                />

                                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-3 space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

                                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">

                                        <div className="flex items-center gap-3">

                                            <img
                                                referrerPolicy="no-referrer"
                                                src={
                                                    user?.image
                                                }
                                                alt={user?.name}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500"
                                            />
                                            <div className="min-w-0">

                                                <h4 className="font-bold text-slate-900 dark:text-white">
                                                    {user?.name}
                                                </h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 break-all max-w-[170px]">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="block mt-4 bg-cyan-500 hover:bg-cyan-600 text-white text-center py-2 rounded-xl font-semibold transition"
                                        >
                                            Edit Profile
                                        </Link>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition text-slate-700 dark:text-slate-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                            className="lg:hidden w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300"
                        >

                            {menuOpen ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {menuOpen && (

                <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="px-6 py-6 flex flex-col gap-5">
                        {user && (
                            <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <img
                                    referrerPolicy="no-referrer"
                                    src={
                                        user?.image
                                    }
                                    alt={user?.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                                />
                                <div className="min-w-0">
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white line-clamp-1">
                                        {user?.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 break-all max-w-[180px]">
                                        {user?.email}
                                    </p>
                                    <Link
                                        href="/profile"
                                        className="inline-block mt-3 text-cyan-500 font-semibold"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        )}

                        <Link
                            href="/"
                            className="text-lg font-semibold text-cyan-500"
                        >
                            Home
                        </Link>

                        <Link
                            href="/ideas"
                            className="text-lg font-medium text-slate-700 dark:text-slate-300"
                        >
                            Ideas
                        </Link>

                        {user && (
                            <>
                                <Link
                                    href="/add-idea"
                                    className="text-lg font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Add Idea
                                </Link>

                                <Link
                                    href="/my-ideas"
                                    className="text-lg font-medium text-slate-700 dark:text-slate-300"
                                >
                                    My Ideas
                                </Link>

                                <Link
                                    href="/my-interactions"
                                    className="text-lg font-medium text-slate-700 dark:text-slate-300"
                                >
                                    My Interactions
                                </Link>
                            </>
                        )}
                        {!user ? (

                            <div className="flex flex-col gap-4 pt-4">

                                <Link
                                    href="/login"
                                    className="text-center border border-cyan-500 text-cyan-500 py-3 rounded-full font-semibold"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="text-center bg-cyan-500 hover:bg-cyan-600 transition text-white py-3 rounded-full font-semibold"
                                >
                                    Register
                                </Link>
                            </div>

                        ) : (

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;