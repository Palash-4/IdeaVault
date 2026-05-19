"use client";

import Link from "next/link";
import {
    useState,
} from "react";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";
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
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget
        );
        const user = Object.fromEntries(formData.entries());
        setIsPending(true);
        try {
            const { data, error } =
                await authClient.signIn.email({
                    email: user.email,
                    password: user.password,
                });
            if (data) {
                toast.success("Login Successful");
                router.push(redirect);
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

    const handlelogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: redirect,
            });

        } catch (error) {
            console.log(error);
            toast.error(
                "Google Sign In Failed"
            );
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                        Login
                    </h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Welcome back to IdeaVault
                    </p>
                </div>
                <Form
                    onSubmit={onSubmit}
                    className="space-y-7"
                >
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
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Minimum 8 characters required";
                            }
                            return null;
                        }}
                    >
                        <Label className="block mb-3 font-bold text-slate-800 dark:text-slate-200">
                            Password
                        </Label>
                        <Input
                            placeholder="Enter your password"
                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                        />
                        <FieldError className="text-red-500 text-sm mt-2" />
                    </TextField>
                    <Button
                        type="submit"
                        isDisabled={isPending}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-xl"
                    >Login
                    </Button>
                </Form>
                <div className="mt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-cyan-600 font-bold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
                <div className="mt-8">
                    <div className="relative flex items-center justify-center mb-6">

                        <div className="absolute w-full border-t border-slate-300 dark:border-slate-700"></div>

                        <span className="relative bg-white dark:bg-slate-900 px-4 text-sm text-slate-500 dark:text-slate-400">
                            OR CONTINUE WITH
                        </span>
                    </div>

                    <button
                        onClick={handlelogin}
                        type="button"
                        className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 py-4 rounded-2xl font-bold text-slate-800 dark:text-white shadow-sm"
                    >
                        <FcGoogle size={24} />
                        Login with Google
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;