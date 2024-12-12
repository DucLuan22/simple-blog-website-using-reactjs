function EditorPickCard() {
  return (
    <div className="flex flex-row items-center gap-x-4">
      <div className="w-8 sm:w-16 md:w-20 aspect-square rounded-full border border-black overflow-hidden">
        <img
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          className="w-full h-full object-cover"
          alt="Image"
        />
      </div>

      <div className="space-y-2">
        <span className="bg-orange-400 py-1 px-3 rounded-3xl font-semibold text-sm">
          Travel
        </span>

        <h2 className="font-semibold text-base lg:text-lg line-clamp-1">
          A Journey Through Bohemian Beauty: Exploring the Streets of Prague
        </h2>

        <span className="text-sm">
          Kate Woods - <span className="text-gray-400">05.01.2023</span>
        </span>
      </div>
    </div>
  );
}

export default EditorPickCard;
