function EditorPickCard() {
  return (
    <div className="gap-x-5 flex flex-row items-center">
      <nav className="w-[60px] h-[60px] lg:w-[80px] rounded-full overflow-hidden">
        <img
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          className="w-full h-full object-cover"
          alt="Image"
        />
      </nav>

      <div>
        <span className=" bg-orange-400 p-y-3 px-3 rounded-3xl text-sm">
          Travel
        </span>

        <h2 className="font-semibold text-lg ">
          A Journey Through Bohemian Beauty: Exploring the Streets of Prague
        </h2>
        <span className="text-xs">
          Kate Woods - <span className="text-gray-300">05.01.2023</span>
        </span>
      </div>
    </div>
  );
}

export default EditorPickCard;
