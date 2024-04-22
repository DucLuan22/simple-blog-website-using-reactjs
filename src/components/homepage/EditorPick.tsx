import PopularPostCard from "./PopularPostCard";

function EditorPick() {
  return (
    <div>
      <div className="space-y-10">
        <div>
          <p>What's hot</p>
          <h1 className="text-lg md:text-xl font-bold">Most popular</h1>
        </div>
        <PopularPostCard />
        <PopularPostCard />
      </div>
    </div>
  );
}

export default EditorPick;
