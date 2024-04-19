import PopularCategories from "@/components/homepage/PopularCategories";
import RandomPost from "@/components/homepage/RandomPost";

function Homepage() {
  return (
    <div className="space-y-14">
      <h1 className="text-2xl md:text-3xl lg:text-5xl tracking-wide">
        <span className="font-bold"> Hey, Luan here!</span> This is my page,
        where I shared my stories and ideas.
      </h1>

      <RandomPost />
      <PopularCategories />
    </div>
  );
}

export default Homepage;
