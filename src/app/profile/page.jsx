"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {

    const {
        data: session, } = authClient.useSession();
    const user = session?.user;
    const [name, setName] = useState("");

    const [image, setImage] = useState("");

    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user?.name || "");
            setImage(user?.image || "");
        }

    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsPending(true);
        try {
            await authClient.updateUser({
                name,
                image,
            });
            toast.success(
                "Profile Updated"
            );
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error(
                "Update Failed"
            );
        } finally {
            setIsPending(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-center mb-10">
                    <img
                        src={
                            image ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt="profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-cyan-500 mx-auto"
                    />

                    <h1 className="mt-6 text-4xl font-black text-slate-900 dark:text-white">
                        Update Profile
                    </h1>
                    <p className="mt-3 text-slate-500 dark:text-slate-400">
                        Update your personal information
                    </p>
                </div>
                <form
                    onSubmit={handleUpdate}
                    className="space-y-7"
                >
                    <div>

                        <label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) =>
                                setImage(e.target.value)
                            }
                            placeholder="https://example.com/photo.jpg"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-xl"
                    >
                        {
                            isPending
                                ? "Updating..."
                                : "Save Changes"
                        }
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ProfilePage;