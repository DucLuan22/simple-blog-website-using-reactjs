function PopularPost() {
  return (
    <div className="mt-14 md:mt-0">
      <div className="space-y-10">
        <div>
          <p>What's hot</p>
          <h1 className="text-lg md:text-xl font-bold">Most popular</h1>
        </div>
        <div className="space-y-3">
          <span className="bg-orange-400 p-y-3 px-4 rounded-3xl">Travel</span>

          <h2 className="font-semibold text-lg">
            A Journey Through Bohemian Beauty: Exploring the Streets of Prague
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PopularPost;
