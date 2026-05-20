"use client";

import { useEffect, useMemo, useState } from "react";
import IdeaCard from "@/component/IdeaCard";

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("http://localhost:5000/ideas");
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const categories = useMemo(() => {
    const allCategories =
      ideas.map((idea) => idea.category);
    return [
      "All",
      ...new Set(allCategories),
    ];
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    let filtered = [...ideas];
    filtered = filtered.filter(
      (idea) =>
        idea.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        idea.shortDescription
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
    if (category !== "All") {
      filtered = filtered.filter(
        (idea) =>
          idea.category ===
          category
      );
    }
    if (sort === "newest") {
      filtered.reverse();
    }

    if (sort === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    return filtered;

  }, [
    ideas,
    search,
    category,
    sort,
  ]);

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-5">
            STARTUP COMMUNITY
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Browse Ideas
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore innovative startup
            concepts and discover
            creative solutions from
            entrepreneurs worldwide.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-5 md:p-6 shadow-xl mb-12">
          <div className="flex flex-col lg:flex-row gap-5">
            <input
              type="text"
              placeholder="Search ideas..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
            />
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
            >
              {categories.map(
                (cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                )
              )}
            </select>
            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
            >
              <option value="newest">
                Newest
              </option>
              <option value="oldest">
                Oldest
              </option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
              Loading Ideas...
            </h2>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] py-24 text-center shadow-xl">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              No Ideas Found
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Try searching with a
              different keyword or
              category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIdeas.map(
              (idea) => (
                <IdeaCard
                  key={idea._id}
                  idea={idea}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default IdeasPage;