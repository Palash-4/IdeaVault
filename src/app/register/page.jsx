"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "react-aria-components";

const RegisterPage = () => {

    const [isPending, setIsPending] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        setIsPending(true);
        try {
            const { data, error } =
                await authClient.signUp.email({
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    image: user.photoURL,
                });

            if (data) {
                toast.success(
                    "Account Created Successfully"
                );
                window.location.replace("/");
            }
            if (error) {
                toast.error(error.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");

        } finally {
            setIsPending(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-20">

            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-center mb-10">

                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                        Create Account
                    </h1>

                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Join IdeaVault and share your startup ideas
                    </p>
                </div>
                <Form
                    onSubmit={onSubmit}
                    className="space-y-7"
                >
                    <TextField
                        isRequired
                        name="name"
                    >
                        <Label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Full Name
                        </Label>
                        <Input
                            placeholder="Enter Your Name"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />
                        <FieldError className="text-red-500 text-sm mt-2" />
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email";
                            }

                            return null;
                        }}
                    >
                        <Label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Email Address
                        </Label>

                        <Input
                            placeholder="user@example.com"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />

                        <FieldError className="text-red-500 text-sm mt-2" />
                    </TextField>
                    <TextField
                        isRequired
                        name="photoURL"
                        type="url"
                    >
                        <Label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Photo URL
                        </Label>

                        <Input
                            placeholder="https://example.com/photo.jpg"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />

                        <FieldError className="text-red-500 text-sm mt-2" />
                    </TextField>
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {

                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain one uppercase letter";
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Password must contain one number";
                            }
                            return null;
                        }}
                    >
                        <Label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Password
                        </Label>
                        <Input
                            placeholder="Create strong password"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Minimum 8 characters, 1 uppercase & 1 number
                        </p>

                        <FieldError className="text-red-500 text-sm mt-2" />
                    </TextField>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-xl"
                    >Create Account
                    </Button>
                </Form>
                <div className="mt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-cyan-600 font-bold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;