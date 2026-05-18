import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const IdeaCard = ({ idea }) => {
    const { _id, title, category, imageURL, shortDescription, targetAudience } =idea;

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden">
                <Image
                    src={imageURL}
                    alt={title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>
                <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md text-cyan-600 text-xs font-bold px-4 py-2 rounded-full shadow">
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white line-clamp-1">
                    {title}
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[52px]">
                    {shortDescription}
                </p>
                <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 font-bold"></div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Target Audience
                        </p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                            {targetAudience}
                        </p>
                    </div>
                </div>
                <Link
                    href={`/ideas/${_id}`}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-lg"
                >
                    View Details
                    <span className="text-xl ">
                        <ArrowBigRight></ArrowBigRight>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default IdeaCard;
