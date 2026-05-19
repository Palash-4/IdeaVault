import Link from "next/link";

const NotFoundPage = () => {

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-8xl md:text-9xl font-black text-cyan-500">
                    404
                </h1>
                <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                    Page Not Found
                </h2>
                <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <div className="mt-10">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
                    >
                        Back To Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;