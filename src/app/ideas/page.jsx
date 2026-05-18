import IdeaCard from "@/component/IdeaCard";

const IdeasPage = async () => {

  const res = await fetch(
    "http://localhost:5000/ideas",
    {
      cache: "no-store",
    }
  );

  const ideas = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <div className="inline-block bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-5">
            STARTUP COMMUNITY
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Explore Innovative Ideas
          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Discover creative startup concepts,
            connect with innovators, and get inspired
            by the future of technology.
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeasPage;