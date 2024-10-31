function EditorPickCard() {
  return (
    <div className="flex flex-row items-center gap-x-3 sm:gap-x-5">
      <div className="w-24 sm:w-16 md:w-20 lg:w-40 xl:w-32  aspect-square rounded-full border border-black overflow-hidden">
        <img
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          className="w-full h-full object-cover"
          alt="Image"
        />
      </div>

      <div className="space-y-1">
        <span className="bg-orange-400 py-1 px-3 rounded-3xl text-xs sm:text-sm lg:text-base">
          Travel
        </span>

        <h2 className="font-semibold text-lg">
          A Journey Through Bohemian Beauty: Exploring the Streets of Prague
        </h2>
        <span className="text-xs sm:text-sm">
          Kate Woods - <span className="text-gray-300">05.01.2023</span>
        </span>
      </div>
    </div>
  );
}

export default EditorPickCard;
