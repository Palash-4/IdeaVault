import Banner from "@/component/Banner";
import PopularCategories from "@/component/PopularIdea";
import TopContributors from "@/component/TopContributers";
import TrendingIdeas from "@/component/TrendingIdea";
import WorkPage from "@/component/Works";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`,
    {
      cache: "no-store",
    }
  );
  const ideas = await res.json();
  return (
    <div >
      <Banner></Banner>
      <TrendingIdeas ideas={ideas}></TrendingIdeas>
      <PopularCategories></PopularCategories>
      <WorkPage></WorkPage>
      <TopContributors></TopContributors>
    </div>
  );
}